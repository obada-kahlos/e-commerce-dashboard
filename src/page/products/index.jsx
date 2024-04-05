import React, { useEffect, useState } from "react";
import { ProductTable } from "../../components/table/tabel";
import { DialogCustom } from "../../components/popup/popup";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useEditProductMutation,
} from "../../data-access/api/Products/products";
import {
  Button,
  DialogFooter,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
// import { Input } from "../../components/input/input";
import { FileInput } from "../../components/file-input/file-input";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import imageCompression from "browser-image-compression";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

export const Products = () => {
  const [image, setImage] = React.useState("");

  const TABLE_HEAD = [
    "Product id",
    "Product image",
    "Product name",
    "Product description",
    "Product price",
    "Product count",
    "Product status",
    "",
  ];
  const [addPopup, setAddPopup] = React.useState(false);
  const [deletePopup, setDeletePopup] = React.useState(false);

  const handleOpen = () => {
    setAddPopup(!addPopup);
    reset();
  };

  const { data } = useGetProductsQuery({});

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data?.data?.Products) {
      setProducts(data?.data?.Products);
    }
  }, [data]);

  const [addProduct, { isLoading: isLoadingAddProduct }] =
    useAddProductMutation({});
  const [deleteProduct, { isLoading: isLoadingDeletePopup }] =
    useDeleteProductMutation({});
  const [editProduct] = useEditProductMutation({});

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({});

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } catch (error) {
      console.error(error);
    }
  };

  const [productId, setProductId] = React.useState("");
  const handelSetProductId = (id) => {
    setProductId(id);
    setDeletePopup(!deletePopup);
  };
  const handelCloseDeletePopup = (id) => {
    setProductId("");
    setDeletePopup(!deletePopup);
  };

  const [edit, setEdit] = useState("");
  const handleEditProduct = (id) => {
    const productData = products.find((item) => item.id === id);
    setAddPopup(!addPopup);
    setEdit(productData);
  };

  console.log({ edit });

  const onSubmit = async (data) => {
    if (edit) {
      const payload = {
        name: data.name,
        count: data.count,
        price: data.price,
        status: data.status,
        type: data.type,
        description: data.description,
        discount: data.discount,
        url1: data.image,
        age: data.age,
      };
      await editProduct({ payload, id: edit?.id });
      reset();
      setImage("");
    } else {
      const payload = {
        name: data.name,
        count: data.count,
        price: data.price,
        status: data.status,
        type: data.type,
        description: data.description,
        url1: data.image,
        discount: data.discount,
        age: data.age,
      };
      await addProduct(payload);
      reset();
      setImage("");
    }
  };

  console.log({ products });

  return (
    <div className="container mx-auto my-[10px]">
      <ProductTable
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={products}
        handleOpenPopup={handleOpen}
        handelSetProductId={handelSetProductId}
        handleEditProduct={handleEditProduct}
      />
      <DialogCustom
        header={"Delete Product"}
        open={deletePopup}
        handleOpen={handelSetProductId}
      >
        <Typography> Are you sure! </Typography>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handelCloseDeletePopup}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            onClick={async () => {
              await deleteProduct({ id: productId });
              setDeletePopup(!deletePopup);
            }}
            disabled={isLoadingDeletePopup}
            type="submit"
            color="green"
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogCustom>
      <DialogCustom
        header={"New Product"}
        open={addPopup}
        handleOpen={handleOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12">
              <Controller
                name="name"
                control={control}
                defaultValue={edit ? edit?.name : ""}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={"Product Name"}
                    type={"text"}
                    className={"name"}
                  />
                )}
              />
            </div>
            <div className="col-span-12">
              <Controller
                name="count"
                control={control}
                defaultValue={edit ? edit?.count : ""}
                render={({ field }) => (
                  <Input
                    label={"Product Count"}
                    type={"text"}
                    className={"count"}
                    {...field}
                    rounded={"50px"}
                  />
                )}
              />
            </div>

            <div className="col-span-12">
              <Controller
                name="price"
                control={control}
                defaultValue={edit ? edit?.price : ""}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={"Product Price"}
                    type={"text"}
                    className={"price"}
                  />
                )}
              />
            </div>

            <div className="col-span-12">
              <Controller
                name="discount"
                control={control}
                defaultValue={edit ? edit?.discount : ""}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={"Product discount"}
                    type={"text"}
                    className={"discount"}
                  />
                )}
              />
            </div>

            <div className="col-span-12">
              <Controller
                name="status"
                control={control}
                defaultValue={edit ? edit?.status : ""}
                render={({ field }) => (
                  <Select {...field} label="Select Status">
                    <Option value={true}>Active</Option>
                    <Option value={false}>None</Option>
                  </Select>
                )}
              />
            </div>

            <div className="col-span-12">
              <Controller
                name="age"
                control={control}
                defaultValue={edit ? edit?.age : ""}
                render={({ field }) => (
                  <Select {...field} label="Select age">
                    <Option value="جديد">جديد</Option>
                    <Option value="مستعمل">مستعمل</Option>
                    <Option value="اوبن بوكس">اوبن بوكس</Option>
                  </Select>
                )}
              />
            </div>

            <div className="col-span-12">
              <Controller
                name="type"
                control={control}
                defaultValue={edit ? edit?.type : ""}
                render={({ field }) => (
                  <Select {...field} label="Select Type">
                    <Option value="Laptop">Laptop</Option>
                    <Option value="Accessory">Accessory</Option>
                  </Select>
                )}
              />
            </div>

            <div className="col-span-12">
              <Controller
                name="description"
                defaultValue={edit ? edit?.description : ""}
                control={control}
                render={({ field }) => <ReactQuill {...field} />}
              />
            </div>

            <div className="col-span-12">
              <Controller
                name="image"
                control={control}
                defaultValue={edit ? edit?.url1 : ""}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={"Product image"}
                    type={"text"}
                    className={"name"}
                  />
                )}
              />
            </div>

            {/* <div className="col-span-12">
              <Input
                label={"Product image"}
                type={"file"}
                onChange={handleImageUpload}
                accept="image/*"
                className={"name"}
              />
            </div> */}
            {image ? (
              <div className="col-span-12">
                <img
                  src={image}
                  alt="product-image"
                  width={"100%"}
                  height={"200px"}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
          </div>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              disabled={isLoadingAddProduct}
              type="submit"
              color="green"
            >
              <span>Submit</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogCustom>
    </div>
  );
};
