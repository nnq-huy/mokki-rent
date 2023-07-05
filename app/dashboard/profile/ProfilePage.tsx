'use client';

import { useForm } from "react-hook-form"
import * as Yup from "yup";

import { profileSchema } from "@/app/validations/profile.validation";

import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

import { Textarea } from "@/app/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { User } from "@prisma/client";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Separator } from "../../components/ui/separator";
import ImageUpload from "../../components/inputs/ImageUpload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

interface ProfilePageProps {
  currentUser: User | null
}
const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser }) => {
  type ProfileFormValues = Yup.InferType<typeof profileSchema>
  const router = useRouter();

  const defaultValues: Partial<ProfileFormValues> = {
    name: currentUser!.name ?? '',
    email: currentUser!.email ?? '',
    image: currentUser!.image ?? '',
  }

  const form = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {

    await axios.put(`/api/users/${currentUser!.id}`, data)
      .then(() => {
        toast.success('Profile updated');
        router.refresh();
      })
      .catch((e) => {
        toast.error('Something went wrong.' + e)
      });
  };

  return (
    <div className="space-y-4 px-4 py-2 ">
      <div>
        <h1 className="text-xl text-gray-500 font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="enter a new display name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel><br />
                {field.value}
                <FormDescription>
                  Your email address. This is bound to your account and cannot be changed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile picture</FormLabel>
                <Avatar>
                  <AvatarImage src={currentUser?.image!} />
                  <AvatarFallback>Mokki</AvatarFallback>
                </Avatar>
                <ImageUpload
                  value={field.value}
                  onChange={(value) => { form.setValue('image', value) }}
                />
                <FormControl>
                  <Textarea
                    placeholder="Image goes here"
                    className="resize-none hidden"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Click the box above to change profile picture
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </div>
  )
}

export default ProfilePage;