'use client';

import { useForm } from "react-hook-form"
import * as Yup from "yup";


import { Listing } from "@prisma/client";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import axios from "axios";

import { useRouter } from "next/navigation";
import { listingSchema } from "@/app/validations/listing.validation";
import { categories } from "@/app/constants";
import ProvinceSelect from "../inputs/ProvinceSelect";
import useProvinces from "@/app/hooks/useProvinces";

import ConfirmDialog from "@/app/components/ConfirmDialog";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { Textarea } from "@/app/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/components/ui/form"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
import { BsFillPeopleFill } from "react-icons/bs";
import { MdBedroomParent, MdBathroom, MdWater } from "react-icons/md";
import Counter from "../inputs/Counter";
import SaunaToggle from "../inputs/SaunaToggle";
import CategoryInput from "../inputs/CategoryInput";
import { Input } from "../ui/input";
import { Label } from "@/app/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { useState } from "react";

interface DetailsPageProps {
  listing: Listing | null
}
const DetailsPage: React.FC<DetailsPageProps> = ({ listing }) => {
  type ProfileFormValues = Yup.InferType<typeof listingSchema>
  const router = useRouter();
  const allProvinces = useProvinces().getAll();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const onDelete = async () => {
    await axios.delete(`/api/listings/${listing?.id}`)
      .then(() => {
        toast.success('Listing deleted');
        setOpenDeleteDialog(false);
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
  };

  const deleteListingDialog = (
    <ConfirmDialog
      isOpen={openDeleteDialog}
      title="Are you sure you want to delete this listing?"
      subtitle="This action cannot be undone!"
      onConfirm={onDelete}
      onDismiss={() => {
        setOpenDeleteDialog(false);
      }}
      actionLabel="Delete"
    />
  );

  const defaultValues: Partial<ProfileFormValues> = {
    title: listing!.title ?? '',
    category: listing!.category ?? '',
    imageSrc: listing!.imageSrc ?? '',
    locationValue: listing!.locationValue ?? '',
    description: listing!.description ?? '',
    roomCount: listing!.roomCount ?? 1,
    guestCount: listing!.guestCount ?? 1,
    bathroomCount: listing!.bathroomCount ?? 1,
    hasSauna: listing!.hasSauna ?? true,
    price: listing!.price ?? 1,
    status: listing!.status ?? 'available',
    userId: listing!.userId ?? ''
  }

  const form = useForm<ProfileFormValues>({
    resolver: yupResolver(listingSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {

    await axios.put(`/api/listings/${listing!.id}`, data)
      .then(() => {
        toast.success('Listing updated');
        router.refresh();
      })
      .catch((e) => {
        toast.error('Something went wrong.' + e)
      });
  };

  return (
    <div className="space-y-4 px-0 md:px-4 py-2 max-w-screen-xl w-[80vw]">
      <div>
        <h1 className="text-xl font-semibold">Mokki details</h1>
        <p className="text-sm text-muted-foreground">
          You can edit your property info here
        </p>
      </div>
      <Separator />
      <>{deleteListingDialog}</>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold">Basic details</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:px-4 px-0 pb-4">
                      <FormLabel className="text-gray-700">Title</FormLabel>
                      <FormControl>
                        <Input className="bg-white text-gray-500" placeholder="enter a new title for the listing" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:px-4 px-0 pb-4">
                      <FormLabel className="text-gray-700 pt-4">Description</FormLabel>
                      <FormControl>
                        <Textarea className="bg-white h-72 text-gray-500" placeholder="enter a new title for the listing" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="locationValue"
                  render={({ field }) => (
                    <FormItem className="md:px-4 px-0 pb-4">
                      <FormLabel className="text-gray-700">Location</FormLabel>
                      <FormControl>
                        <ProvinceSelect
                          value={allProvinces.find(
                            (e) => { return e.value === field.value }
                          )}
                          onChange={(value) => {
                            form.setValue('locationValue', value.value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageSrc"
                  render={({ field }) => (
                    <FormItem className="md:px-4">
                      <FormLabel className="text-gray-700">Mokki picture</FormLabel>
                      <ImageUpload
                        value={field.value}
                        onChange={(value) => { form.setValue('imageSrc', value) }}
                      />
                      <FormControl>
                        <Textarea
                          placeholder="Image goes here"
                          className="resize-none hidden"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Click the box above to change listing picture
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-bold">Category</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="md:px-4">
                      <FormControl>
                        <div className="flex flex-col gap-8">
                          <div
                            className="
                              grid 
                              grid-cols-1 
                              md:grid-cols-2 
                              gap-3
                              max-h-[50vh]
                              overflow-y-auto
                              "
                          >
                            {categories.map((item) => (
                              <div key={item.label} className="col-span-1">
                                <CategoryInput
                                  onClick={(category) =>
                                    form.setValue('category', category)}
                                  selected={field.value === item.label}
                                  label={item.label}
                                  icon={item.icon}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold">Amenities</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-8">
                  <FormField
                    control={form.control}
                    name="guestCount"
                    render={({ field }) => (
                      <FormItem className="md:px-4">
                        <FormControl>
                          <div>
                            <Counter
                              icon={BsFillPeopleFill}
                              onChange={(value) => { form.setValue('guestCount', value) }}
                              value={field.value}
                              title="Guests"
                              subtitle="How many guests do you allow?"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roomCount"
                    render={({ field }) => (
                      <FormItem className="md:px-4 px-0">
                        <FormControl>
                          <div>
                            <Counter
                              icon={MdBedroomParent}
                              onChange={(value) => { form.setValue('roomCount', value) }}
                              value={field.value}
                              title="Rooms"
                              subtitle="How many rooms do you have?"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bathroomCount"
                    render={({ field }) => (
                      <FormItem className="md:px-4 px-0">
                        <FormControl>
                          <div>
                            <Counter
                              icon={MdBathroom}
                              onChange={(value) => { form.setValue('bathroomCount', value) }}
                              value={field.value}
                              title="Bathrooms"
                              subtitle="How many bathrooms do you have?"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hasSauna"
                    render={({ field }) => (
                      <FormItem className="md:px-4 px-0">
                        <FormControl>
                          <div>
                            <SaunaToggle
                              icon={MdWater}
                              title='Sauna'
                              subtitle='Does your mökki have a sauna?'
                              value={field.value}
                              onChange={(value) => form.setValue('hasSauna', value)}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="font-bold">Price and availability</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="md:px-4 px-0 pb-4">
                      <FormLabel className="text-gray-700">Price per night</FormLabel>
                      <FormControl>
                        <div className="font-semibold flex flex-row items-center">
                          €
                          <Input
                            type='number'
                            defaultValue={100}
                            {...field}>
                          </Input>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="md:px-4 px-0">
                      <FormLabel className="text-gray-700">Current availability</FormLabel>
                      <FormControl>
                        <div>
                          <RadioGroup defaultValue={field.value}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="available" id="available" />
                              <Label className="text-gray-500" htmlFor="available">Available</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="unavailable" id="unavailable" />
                              <Label className="text-gray-500" htmlFor="unavailable">Unavailable</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex flex-row gap-4 pt-4">
            <Button type="submit">Save</Button>
            <Button type="reset" onClick={() => { form.reset(defaultValues) }}>Reset</Button>
            <Button className="bg-red-500" type="button" onClick={() => {setOpenDeleteDialog(true)}}>Delete listing</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default DetailsPage;