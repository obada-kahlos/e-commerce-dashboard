import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

export const getImage = (rawURL) => {
  const RAW_URL1 = rawURL?.split("/d/");
  const RAW_URL2 = RAW_URL1 ? RAW_URL1[1]?.split("/view") : "";
  const IMAGE_ID = RAW_URL2 ? RAW_URL2[0] : "";
  return `https://drive.google.com/thumbnail?id=${IMAGE_ID}`;
};

export const ProductTable = ({
  TABLE_HEAD,
  handleOpenPopup,
  TABLE_ROWS,
  handelSetProductId,
  handleEditProduct,
}) => {
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
          <Button variant="outlined" size="sm" onClick={handleOpenPopup}>
            Create Product
          </Button>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD?.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS?.map(
              (
                {
                  description,
                  discount,
                  id,
                  url1,
                  name,
                  price,
                  type,
                  status,
                  count,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    {/* <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {id}
                      </Typography>
                    </td> */}
                    <td className={classes}>
                      <img src={getImage(url1)} alt={name} />
                      {/* <Avatar src={getImage(url1)} alt={name} size="xxl" /> */}
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    {/* <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {description?.slice(0, 60)}
                      </Typography>
                    </td> */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {price}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {count}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {status ? (
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={status ? "Active" : "None"}
                            color={status ? "green" : "blue-gray"}
                          />
                        </div>
                      ) : null}
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit Product">
                        <IconButton
                          variant="text"
                          onClick={() => handleEditProduct(id)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete Product">
                        <IconButton
                          variant="text"
                          onClick={() => handelSetProductId(id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};
