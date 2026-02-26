import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCategories } from "@/api/category";
import { useEffect, useState } from "react";
import { Category } from "@/Types/categoryType";
import { Trash2, Pencil } from "lucide-react";
import { AddCategoryModal } from "@/components/admin/playground/createProduct/AddCategoryModal.tsx";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { UpdateModal } from "@/components/Modals/UpdateModal";

export function Categories() {
  
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      console.log(categories);
      setCategories(categories.data);
    };
    fetchCategories();
  }, []);

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] =
    useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Categorie</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>mm/dd/yy</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Trash2
                    className="hover:cursor-pointer  hover:text-red-500"
                    onClick={() => {
                      setIsDeleteCategoryModalOpen(true);
                    }}
                  />
                  <Pencil className="hover:cursor-pointer hover:text-sky-500" onClick={() => {
                    setSelectedCategoryId(category._id);
                    setIsUpdateCategoryModalOpen(true);
                  }} />
                </div>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center hover:cursor-pointer"
              onClick={() => setIsAddCategoryModalOpen(true)}
            >
              Add Categorie +
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <DeleteModal
        isOpen={isDeleteCategoryModalOpen}
        onClose={() => setIsDeleteCategoryModalOpen(false)}
        title="Delete Category"
      />

      <UpdateModal
        isOpen={isUpdateCategoryModalOpen}
        onClose={() => setIsUpdateCategoryModalOpen(false)}
        title="Update Category"
        id={selectedCategoryId!}
      />

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        title="Add Category"
      />
    </>
  );
}
