
"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";

export function  EditModal({ destination }) {
  if (!destination) {
    return null;
  }

  const {
    _id,
    imageUrl,
    price,
    destinationName,
    duration,
    country,
    description,
    category,
    departureDate,
  } = destination;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedDestination = Object.fromEntries(formData.entries());

    updatedDestination.price = Number(updatedDestination.price);
    

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`
          },
          body: JSON.stringify(updatedDestination),
        }
      );

      const responseText = await res.text();

      console.log("Response status:", res.status);
      console.log("Response body:", responseText);

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Server returned HTML instead of JSON. Check the backend URL and server."
        );
      }

      if (!res.ok) {
        alert(data.message || "Failed to update destination.");
        return;
      }

      alert("Destination updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Update error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Modal>
      <Button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-indigo-700">
        <BiEdit className="h-5 w-5" />
        Edit Destination
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Edit Destination</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="space-y-6 p-4">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <TextField
                        name="destinationName"
                        defaultValue={destinationName}
                        isRequired
                      >
                        <Label>Destination Name</Label>
                        <Input placeholder="Bali Paradise" />
                        <FieldError />
                      </TextField>
                    </div>

                    <TextField
                      name="country"
                      defaultValue={country}
                      isRequired
                    >
                      <Label>Country</Label>
                      <Input placeholder="Indonesia" />
                      <FieldError />
                    </TextField>

                    <div>
                      <Select
                        name="category"
                        defaultValue={category}
                        isRequired
                        className="w-full"
                        placeholder="Select category"
                      >
                        <Label>Category</Label>

                        <Select.Trigger className="rounded-2xl">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          <ListBox>
                            {[
                              "Beach",
                              "Mountain",
                              "City",
                              "Adventure",
                              "Cultural",
                              "Luxury",
                            ].map((item) => (
                              <ListBox.Item
                                key={item}
                                id={item}
                                textValue={item}
                              >
                                {item}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    <TextField
                      name="price"
                      defaultValue={String(price)}
                      type="number"
                      isRequired
                    >
                      <Label>Price (USD)</Label>
                      <Input type="number" placeholder="1299" />
                      <FieldError />
                    </TextField>

                    <TextField
                      name="duration"
                      defaultValue={duration}
                      isRequired
                    >
                      <Label>Duration</Label>
                      <Input placeholder="7 Days / 6 Nights" />
                      <FieldError />
                    </TextField>

                    <div className="md:col-span-2">
                      <TextField
                        name="departureDate"
                        defaultValue={departureDate?.slice(0, 10)}
                        type="date"
                        isRequired
                      >
                        <Label>Departure Date</Label>
                        <Input type="date" />
                        <FieldError />
                      </TextField>
                    </div>

                    <div className="md:col-span-2">
                      <TextField
                        name="imageUrl"
                        defaultValue={imageUrl}
                        isRequired
                      >
                        <Label>Image URL</Label>
                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    <div className="md:col-span-2">
                      <TextField
                        name="description"
                        defaultValue={description}
                        isRequired
                      >
                        <Label>Description</Label>
                        <TextArea placeholder="Describe the travel experience..." />
                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  <Modal.Footer>
                    <Button type="submit">Save Changes</Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
