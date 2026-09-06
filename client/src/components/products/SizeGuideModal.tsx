import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface SizeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SIZE_GUIDE_ROWS = [
  { size: "XS", chest: "78 - 82", waist: "60 - 64", hip: "84 - 88" },
  { size: "S", chest: "83 - 87", waist: "65 - 69", hip: "89 - 93" },
  { size: "M", chest: "88 - 92", waist: "70 - 74", hip: "94 - 98" },
  { size: "L", chest: "93 - 99", waist: "75 - 81", hip: "99 - 105" },
  { size: "XL", chest: "100 - 106", waist: "82 - 88", hip: "106 - 112" },
  { size: "XXL", chest: "107 - 113", waist: "89 - 95", hip: "113 - 119" },
];

export function SizeGuideModal({ open, onOpenChange }: SizeGuideModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Guía de tallas</DialogTitle>
          <DialogDescription>
            Medidas de referencia en centímetros. Si estás entre dos tallas,
            te recomendamos elegir la más grande.
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Talla</TableHead>
              <TableHead>Pecho (cm)</TableHead>
              <TableHead>Cintura (cm)</TableHead>
              <TableHead>Cadera (cm)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SIZE_GUIDE_ROWS.map((row) => (
              <TableRow key={row.size}>
                <TableCell className="font-medium">{row.size}</TableCell>
                <TableCell>{row.chest}</TableCell>
                <TableCell>{row.waist}</TableCell>
                <TableCell>{row.hip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
