import React from "react";
import { ProductTable } from "../../components/table/tabel";
import { DialogCustom } from "../../components/popup/popup";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
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

  const handleOpen = () => setAddPopup(!addPopup);

  const { data } = useGetProductsQuery({});
  const [addProduct, { isLoading: isLoadingAddProduct }] =
    useAddProductMutation({});
  const [deleteProduct, { isLoading: isLoadingDeletePopup }] =
    useDeleteProductMutation({});

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

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      count: data.count,
      price: data.price,
      status: data.status,
      type: data.type,
      description: data.description,
      images: [image],
      discount: data.discount,
    };
    console.log(payload);
    await addProduct(payload);
    reset();
    setImage("");
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
  console.log({ productId });

  return (
    <div className="container mx-auto my-[10px]">
      <ProductTable
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={data?.data?.Products}
        handleOpenPopup={handleOpen}
        handelSetProductId={handelSetProductId}
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} label="Select Status">
                    <Option value="true">Active</Option>
                    <Option value="false">None</Option>
                  </Select>
                )}
              />
            </div>

            <div className="col-span-12">
              <Controller
                name="type"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} label="Select Type">
                    <Option value="Laptop">Laptop</Option>
                    <Option value="Accessory">Accessory</Option>
                  </Select>
                )}
              />
            </div>

            <div className="col-span-12">
              {/* <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label={"Product Description"}
                    type={"text"}
                    className={"description"}
                  />
                )}
              /> */}
              <Controller
                name="description"
                control={control}
                render={({ field }) => <ReactQuill {...field} />}
              />
            </div>

            <div className="col-span-12">
              <Input
                label={"Product Name"}
                type={"file"}
                onChange={handleImageUpload}
                accept="image/*"
                className={"name"}
              />
            </div>
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
