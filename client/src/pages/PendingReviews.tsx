import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getPendingReviews } from "@/api/pendingReviews";
import { useAuth } from "@/store/authStore";
import { PendingReview } from "@/Types/pendingReview";
import noReviewsImage from "@/assets/svg/undraw_empty_4zx0.svg";
import { useNavigate } from "react-router-dom";

export function PendingReviews() {
  const { user } = useAuth();
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPendingReviews = async () => {
      try {
        const res = await getPendingReviews(user?._id || "");
        setPendingReviews(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadPendingReviews();
  }, []);

  if (pendingReviews.length === 0) {
    return (
      <div className="p-20 sm:px-6 lg:px-8 h-[100vh] w-full flex flex-col gap-5">
        <h1 className="mb-5 text-3xl font-bold">Reviews</h1>
        <div className="w-full flex flex-col gap-10 items-center h-[50%">
          <img
            src={noReviewsImage}
            alt="No pending reviews"
            className="h-[50%]"
          />
          <h2 className="mb-5 text-3xl font-bold">No pending reviews to show</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="p-20 sm:px-6 lg:px-8 min-h-[85vh] w-full">
      <h1 className="mb-5 text-3xl font-bold">Pending Reviews</h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-center">Rating</TableHead>
            <TableHead className="text-right">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingReviews.map((review) => (
            <TableRow key={review._id}>
              <TableCell>{review.createdAt}</TableCell>
              <TableCell>{review.createdAt}</TableCell>
              <TableCell className="text-center">{review._id}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={()=>{
                      navigate(`/profile/pending-reviews/${review._id}`)
                    }}>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
