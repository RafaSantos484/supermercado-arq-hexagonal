import { EspecificacaoProduto } from "../core/EspecificacaoProduto";

export interface CatalogoProdutosService {
  incluirEspecProd(id: number, descricao: string, preco: number): void;
  getEspecProd(id: number): EspecificacaoProduto | undefined;
}
