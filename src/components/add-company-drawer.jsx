/* eslint-disable react/prop-types */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { addNewCompany } from "@/api/apiCompanies";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine((file) => file?.length > 0, {
      message: "File is required",
    })
    .refine(
      (file) =>
        file[0]?.type === "image/png" ||
        file[0]?.type === "image/jpeg" ||
        file[0]?.type === "image/jpg",
      {
        message: "Only PNG, JPG, and JPEG images are allowed",
      }
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    const companyData = {
      name: data.name, 
      logo: data.logo[0], // Get the actual file
    };
  
    console.log("Submitting company data:", companyData); // Debugging
  
    fnAddCompany(companyData); // Pass as a plain object, NOT FormData
  };
  

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
      reset(); // Reset the form after successful submission
    }
  }, [dataAddCompany]);

  return (
    <Drawer>
      <DrawerTrigger>
        <Button type="button" size="sm" variant="secondary">
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a New Company</DrawerTitle>
        </DrawerHeader>
        <form className="flex flex-col gap-4 p-4 pb-0" onSubmit={handleSubmit(onSubmit)}>
          {/* Company Name */}
          <Input placeholder="Company name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          {/* Company Logo */}
          <Input type="file" accept="image/*" className="file:text-gray-500" {...register("logo")} />
          {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}

          {/* Add Button */}
          <Button type="submit" variant="destructive" className="w-40">
            Add
          </Button>
        </form>

        <DrawerFooter>
          {errorAddCompany?.message && <p className="text-red-500">{errorAddCompany?.message}</p>}
          {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />}
          <DrawerClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
