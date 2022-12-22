import { Inter } from "@next/font/google";
import { SubmitHandler } from "react-hook-form";
import FieldArray from "../src/components/FieldArray/FieldArray";
import { FormValues } from "../src/components/FieldArray/FieldArrayTypes";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  function onSubmit(data: FormValues) {
    return Promise.resolve(data);
  }
  return (
    <>
      <main>
        <FieldArray onSubmit={onSubmit} />
      </main>
    </>
  );
}
