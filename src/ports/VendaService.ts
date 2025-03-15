export interface VendaService {
  iniciarVenda(): void;
  incluirItem(codProd: number, quantProd: number): void;
  getTotal(): Promise<number>;
  getTroco(valorPago: number, total?: number): Promise<number>;
}
