import { VendaService } from "../ports/VendaService";
import { CatalogoProdutos } from "./CatalogoProdutos";
import { Venda } from "./Venda";
import { FileEspecificacaoProdutoRepository } from "../adapters/FileEspecificacaoProdutoRepository";
import TerminalUtils from "./TerminalUtils";

export class CaixaSupermercado {
  constructor(private vendaService: VendaService) {}

  static async run(): Promise<void> {
    const repository = new FileEspecificacaoProdutoRepository();
    await repository.loadFromFile("ArqEspecProds.txt");

    const catalogoProdutosService = new CatalogoProdutos(repository);
    const vendaService = new Venda(catalogoProdutosService);

    const meuCaixa = new CaixaSupermercado(vendaService);
    await meuCaixa.menuPrincipal();
  }

  private async menuPrincipal(): Promise<void> {
    TerminalUtils.titulo("Menu Principal");

    const [indice] = await TerminalUtils.menu(["Nova venda", "Sair"]);

    switch (indice) {
      case 0:
        await this.menuNovaVenda();
        break;
      default:
        process.exit(0);
    }

    this.menuPrincipal();
  }

  private async menuNovaVenda(): Promise<void> {
    TerminalUtils.titulo("Nova Venda");

    const [indice] = await TerminalUtils.menu([
      "Incluir produto",
      "Finalizar venda",
    ]);

    switch (indice) {
      case 0:
        await this.menuInserirProduto();
        await this.menuNovaVenda();
        break;
      default:
        await this.menuFinalizarVenda();
    }
  }

  private async menuInserirProduto(): Promise<void> {
    TerminalUtils.titulo("Inserir Produto");

    const codProduto = await TerminalUtils.campoRequerido(
      "Digite o código do produto: "
    );
    const quantidade = await TerminalUtils.campoRequerido(
      "Digite a quantidade: "
    );

    try {
      this.vendaService.incluirItem(parseInt(codProduto), parseInt(quantidade));
    } catch (err) {
      TerminalUtils.erro(String(err));
      await TerminalUtils.esperarEnter();
    }
  }

  private async menuFinalizarVenda(): Promise<void> {
    TerminalUtils.titulo("Finalizar Venda");

    const total = await this.vendaService.getTotal();
    TerminalUtils.exibirChaveValor("Total da venda: ", total);

    const valorPagoStr = await TerminalUtils.campoRequerido(
      "Digite o valor pago: "
    );
    const valorPago = parseFloat(valorPagoStr);
    const troco = await this.vendaService.getTroco(valorPago, total);
    TerminalUtils.exibirChaveValor("\nTroco: ", troco);
    await TerminalUtils.esperarEnter();
  }
}
