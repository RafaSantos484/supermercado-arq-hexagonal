import { CatalogoProdutosService } from "../ports/CatalogoProdutosService";
import { EspecificacaoProduto } from "./EspecificacaoProduto";
import { EspecificacaoProdutoRepository } from "../ports/EspecificacaoProdutoRepository";

export class CatalogoProdutos implements CatalogoProdutosService {
  constructor(private repository: EspecificacaoProdutoRepository) {}

  incluirEspecProd(id: number, descricao: string, preco: number): void {
    const especProd = new EspecificacaoProduto(id, descricao, preco);
    this.repository.save(especProd);
  }

  getEspecProd(id: number): EspecificacaoProduto | undefined {
    return this.repository.findById(id);
  }
}
