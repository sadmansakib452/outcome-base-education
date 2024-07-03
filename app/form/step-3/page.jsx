'use client'
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

import useFormStore from "@/store/useFormStore"
import { stepThreeSchema } from "@/lib/yup";

import Seo from "@/components/Seo"
import Input from "@/components/Forms/Input"
import Button from "@/components/Button"
import UnstyledLink from "@/components/UnstyledLink"
import DropzoneInput from "@/components/Forms/DropzoneInput"

export default function StepTwoPage() {
  const router = useRouter()

  const { stepOne, stepTwo, stepThree, setData } = useFormStore()

  // useEffect(() => {
  //   if (!stepOne) {
  //     toast.error('Please fill step one first');
  //     router.push('/form/step-1');
  //   }
  // }, [router, stepOne]);

  //#region //? forms ==================================
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(stepThreeSchema),
    defaultValues: stepThree || {},
  });
  const { handleSubmit } = methods
  //#endregion forms

  //#region //? action ==================================
  const onSubmit = data => {
    // eslint-disable-next-line no-console
    console.log(data)
    setData({ step: 3, data })

    router.push("/form/step-4")
  }
  //#endregion action

  return (
    <>
      <Seo templateTitle="Step 3" />

      <main>
        <section className="bg-gray-100">
          <article className="min-h-screen py-16 layout">
            <h1>Step 3</h1>
            <div className="flex items-start mt-4">
              <UnstyledLink
                className="p-2 text-lg transition-colors bg-white border border-gray-300 rounded hover:bg-gray-100"
                href="/form/step-2"
              >
                <HiChevronLeft />
              </UnstyledLink>
              <UnstyledLink
                className="p-2 text-lg transition-colors bg-white border border-gray-300 rounded hover:bg-gray-100"
                href="/form/step-4"
              >
                <HiChevronRight />
              </UnstyledLink>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-sm mt-8 space-y-4"
              >
                {/* <Input id="score_1" label="Score 1" />
                <Input id="score_2" label="Score 2" />
                <Input id="score_3" label="Score 3" /> */}
                {/* <DropzoneInput
                  label="Final Grades of the students (Tabulation Sheet)"
                  id="score_file"
                  accept="image/png, image/jpg, image/jpeg"
                  helperText="You can only drop .jpg, .jpeg, or .png file here"
                  maxFiles={3}
                /> */}
                <DropzoneInput
                  label="Summary of the OBE Sheet (Analysis of Grade Distribution, CO Attainment, PO Attainment, and CQI - Plan for Course Improvement. Must use CSE departmental OBE Sheet"
                  id="identity_card"
                  accept="application/pdf"
                  helperText="You can only drop .pdf file here"
                  maxFiles={1}
                />

                <Button type="submit">Next</Button>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  )
}
