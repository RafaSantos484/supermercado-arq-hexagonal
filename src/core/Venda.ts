import { CatalogoProdutosService } from "../ports/CatalogoProdutosService";
import { ItemDeVenda } from "./ItemDeVenda";
import { Utils } from "./Utils";
import { VendaService } from "../ports/VendaService";

export class Venda implements VendaService {
  private itensDeVenda: ItemDeVenda[] = [];
  private catalogoProdutosService: CatalogoProdutosService;

  constructor(catalogoProdutosService: CatalogoProdutosService) {
    this.catalogoProdutosService = catalogoProdutosService;
  }

  iniciarVenda(): void {
    this.itensDeVenda = [];
  }

  incluirItem(codProd: number, quantProd: number): void {
    const especProd = this.catalogoProdutosService.getEspecProd(codProd);
    if (especProd) {
      this.itensDeVenda.push(new ItemDeVenda(especProd, quantProd));
    } else {
      throw new Error("Produto não encontrado no catálogo.");
    }
  }

  async getTotal(verbose = true): Promise<number> {
    let total = 0;
    if (verbose) {
      console.log("Total: " + total);
      await Utils.sleep(1000);
    }
    for (const item of this.itensDeVenda) {
      total += await item.getSubtotal();
      if (verbose) {
        console.log("Total: " + total);
        await Utils.sleep(1000);
      }
    }
    return total;
  }

  async getTroco(valorPago: number, total?: number): Promise<number> {
    total ??= await this.getTotal(false);
    return valorPago - total;
  }
}
