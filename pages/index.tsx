import { Inter } from "@next/font/google";
import FieldArray from "../src/components/FieldArray/FieldArray";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main>
        <FieldArray
          onSubmit={(values) => {
            console.log("Form Submitted", values);
          }}
        />
      </main>
    </>
  );
}
