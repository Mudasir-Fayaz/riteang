// types/jspdf.d.ts

declare module 'jspdf' {
  export class jsPDF {
    constructor(options?: any)

    text(text: string, x: number, y: number): void
    save(filename: string): void
    addPage(): void
    addImage(imageData: string, format: "JPEG" | "PNG", x: number, y: number, width: number, height: number): void
    setFontSize(size: number): void
    // Add more methods as needed
  }
}
