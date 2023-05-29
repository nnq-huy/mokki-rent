'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import {
  FormProvider,
  useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Button from "../Button";
import Heading from "../Heading";
import { FaGithub } from "react-icons/fa";
import { FormInput } from "../auth/FormInput";
import { loginSchema } from "@/app/validations/login.validation";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";



const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

	type FormData = Yup.InferType<typeof loginSchema>;

  const methods = useForm<FormData>({ mode: "onBlur", resolver: yupResolver(loginSchema) });
	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = methods;
  

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
		signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
	};

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
      />
      <FormProvider {...methods}>
				<form
					action=""
					className="w-full mx-auto px-1"
					onSubmit={handleSubmit(onSubmit)}
				>
					<FormInput
						label="Email"
						name="email"
						type="email"
						formOptions={loginSchema.fields.email}
						errors={errors.email}
					/>
					<FormInput
						label="Password"
						name="password"
						type="password"
						formOptions={loginSchema.fields.password}
						errors={errors.password}
					/>
          <div className="pb-6"></div>
          <Button
            disabled={isLoading} 
            label={'Continue'} 
            onClick={handleSubmit(onSubmit)}
          />
				</form>
			</FormProvider>
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={FaGithub}
        onClick={() => signIn('github')}
      />
      <div className="
      text-neutral-500 text-center mt-4 font-light">
        <p>First time here?
          <span 
            onClick={onToggle} 
            className="
              text-mokki-green
              cursor-pointer 
              hover:underline
            "
            > Create an account</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
