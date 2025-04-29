import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
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

  const { data, isLoading: isLoadingDollarPrice } = useGetDollarQuery({});
  const [dollar, setDollar] = useState(0);

  useEffect(() => {
    if (data?.data?.dollar_price_by_pk) {
      setDollar(data?.data?.dollar_price_by_pk?.dollar_price);
    }
  }, [data]);

  const [editDollar, { isLoading }] = useUpdateDollarMutation({});

  const onSubmit = async (data) => {
    const payload = {
      dollar_price: data.dollar_price,
    };
    await editDollar({
      payload,
      id: "d930fc44-7061-4184-b8fe-42c6f6cbc069",
    });
  };

  if (isLoadingDollarPrice) {
    return (
      <div className="w-full h-screen flex items-center justify-center gap-4">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center gap-4 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[300px] flex flex-col gap-2 items-center">
            <p> Old price {dollar} </p>
            <Controller
              name="dollar_price"
              control={control}
              defaultValue={dollar}
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
              disabled={isLoading}
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
