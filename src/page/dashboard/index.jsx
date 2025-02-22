import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useGetDollarQuery,
  useUpdateDollarMutation,
} from "../../data-access/api/dollar";

export const Dashboard = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({});

  const { data } = useGetDollarQuery({});
  const [editDollar] = useUpdateDollarMutation({});

  const onSubmit = async (data) => {
    const payload = {
      dollar_price: data.dollar_price,
    };
    await editDollar({
      payload,
      id: "d930fc44-7061-4184-b8fe-42c6f6cbc069",
    });
    reset();
  };

  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center gap-4 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-span-12">
            <Controller
              name="dollar_price"
              control={control}
              defaultValue={data?.data?.dollar_price_by_pk?.dollar_price}
              render={({ field }) => (
                <Input
                  label={"Dollar Price"}
                  type={"text"}
                  className={"dollar"}
                  {...field}
                  rounded={"50px"}
                />
              )}
            />
            <Button
              variant="gradient"
              disabled={isLoadingAddProduct}
              type="submit"
              color="green"
            >
              <span>Add Dollar Price</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
