import { EspecificacaoProduto } from "../core/EspecificacaoProduto";

export interface EspecificacaoProdutoRepository {
  save(especificacaoProduto: EspecificacaoProduto): void;
  findById(id: number): EspecificacaoProduto | undefined;
}
