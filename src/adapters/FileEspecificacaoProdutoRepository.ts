import fs from "fs";
import { EspecificacaoProduto } from "../core/EspecificacaoProduto";
import { EspecificacaoProdutoRepository } from "../ports/EspecificacaoProdutoRepository";

export class FileEspecificacaoProdutoRepository
  implements EspecificacaoProdutoRepository
{
  private mapaEspecs: Record<number, EspecificacaoProduto> = {};

  save(especificacaoProduto: EspecificacaoProduto): void {
    this.mapaEspecs[especificacaoProduto.Id()] = especificacaoProduto;
  }

  findById(id: number): EspecificacaoProduto | undefined {
    return this.mapaEspecs[id];
  }

  async loadFromFile(filename: string): Promise<void> {
    const fileContent = fs.readFileSync(filename, "utf8");
    const lines = fileContent.split("\n");
    for (const line of lines) {
      const [id, descricao, preco] = line.split(",");
      if (id && descricao && preco) {
        this.save(
          new EspecificacaoProduto(parseInt(id), descricao, parseFloat(preco))
        );
      }
    }
  }
}
