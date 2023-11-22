"use client";

import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../firebase";
import { Formik } from "formik";
import * as Yup from "yup";

type FormProps = {
  name: string;
  key: string;
};

const initialValues = {
  name: "",
  key: "",
};

const keys = [
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
  "Db",
  "Ab",
  "Eb",
  "Bb",
  "F",
  "Am",
  "Em",
  "Bm",
  "F#m",
  "C#m",
  "G#m",
  "D#m",
  "Bbm",
  "Fm",
  "Cm",
  "Gm",
  "Dm",
];

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nome da música precisa ser mais longo")
    .max(50, "Nome muito longo")
    .required("O nome é um campo obrigatório"),
  key: Yup.string()
    .min(1)
    .max(3, "Coloque o tom com a notação correta. Ex.: F#m")
    .oneOf(keys, `Esse tom não existe. O tom deve ser um desses: ${keys}`)
    .required("O tom é um campo obrigatório"),
});

export default function Register() {
  const successAlert = () => toast.success("Música cadastrada com sucesso!");
  const errorAlert = () =>
    toast.error("Ocorreu algum erro! Mande mensagem pro Jonão");

  const onSubmit = async (e: FormProps) => {
    const { name, key } = e;
    try {
      await addDoc(collection(db, "musics"), {
        name: name,
        key: key,
      });
      successAlert();
    } catch (e) {
      errorAlert();
      console.error("Error adding document: ", e);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Logo - Céu na terra
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Cadastro de músicas
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                resetForm({ values: { name: "", key: "" } });
              }}
            >
              {({
                errors,
                touched,
                handleSubmit,
                isSubmitting,
                values,
                handleChange,
              }) => (
                <form
                  className="space-y-4 md:space-y-6"
                  action="#"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nome da música
                    </label>
                    <input
                      type="name"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Habitar em Tua presença"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    {errors.name && touched.name ? (
                      <span className="text-sm text-red-500 break-words	">
                        {errors.name}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="key"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tom
                    </label>
                    <input
                      name="key"
                      id="key"
                      placeholder="Bb"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      maxLength={3}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    {errors.key && touched.key ? (
                      <span className="text-sm text-red-500 break-words	">
                        {errors.key}
                      </span>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Cadastrar
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
    // <div className="w-full h-screen flex justify-center items-center">
    // <Formik
    //   initialValues={initialValues}
    //   validationSchema={registerSchema}
    //   onSubmit={(values) => {
    //     console.log(values);
    //   }}
    // >
    //   {({ errors, touched }) => (
    //       <form className="bg-slate-600 shadow-md rounded px-10 pt-10 pb-10 mb-8">
    //         <div className="mb-4">
    //           <label
    //             className="block text-white text-sm font-bold mb-2"
    //             htmlFor="name"
    //           >
    //             Nome da música
    //           </label>
    //           <input
    //             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
    //             type="text"
    //             name="name"
    //             id="name"
    //           />
    //           {errors.name && touched.name ? (
    //             <span className="text-sm text-red-500">{errors.name}</span>
    //           ) : null}
    //         </div>

    //         <div className="mb-4">
    //           <label
    //             className="block text-white text-sm font-bold mb-2"
    //             htmlFor="key"
    //           >
    //             Tom
    //           </label>
    //           <input
    //             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
    //             type="text"
    //             name="key"
    //             id="key"
    //             maxLength={3}
    //           />
    //           {errors.key && touched.key ? (
    //             <span className="text-sm text-red-500">{errors.key}</span>
    //           ) : null}
    //         </div>
    //         <button type="submit">Cadastrar</button>
    //       </form>
    //     )}
    //   </Formik>
    // </div>
  );
}
