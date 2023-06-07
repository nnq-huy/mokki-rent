'use client';

import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FormProvider,
  useForm
} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Button from "../Button";
import { FaGithub } from "react-icons/fa";
import { signupSchema } from "@/app/validations/signup.validation";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../auth/FormInput";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  type FormData = Yup.InferType<typeof signupSchema>;
  const methods = useForm<FormData>({ mode: "onBlur", resolver: yupResolver(signupSchema) });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: FormData) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        toast.success('Registered!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col">
      <Heading
        title="Welcome to MökkiRent"
        subtitle="Create an account!"
      />
      <FormProvider {...methods}>
        <form
          action=""
          className="w-full mx-auto px-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label="Name"
            name="name"
            type="name"
            formOptions={signupSchema.fields.name}
            errors={errors.name}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            formOptions={signupSchema.fields.email}
            errors={errors.email}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            formOptions={signupSchema.fields.password}
            errors={errors.password}
          />
          <FormInput
            label="Confirm Password"
            name="confirm_password"
            type="password"
            formOptions={signupSchema.fields.confirm_password}
            errors={errors.confirm_password}
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
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span
            onClick={onToggle}
            className="
              text-mokki-green
              cursor-pointer 
              hover:underline
            "
          > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
