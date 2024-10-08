import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import PathRoute from "../../components/pathRoute/PathRoute";
import { queryHandlerAsync } from "../../redux/contact/contactSlice";
import { useAppDispatch } from "../../redux/hooks";

const Contact = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const formSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    dispatch(queryHandlerAsync(data)).then((res) => {
      toast.success(res.payload.message, {
        position: "bottom-left",
      });
      reset();
      setIsLoading(false);
    });
  };

  return (
    <>
      <div className="sm:mt-5 mb-20">
        <PathRoute path="Contact" />
        <div className="mb-10">
          <h2 className="text-2xl font-bold">CONTACT INFO</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="col-span-1">
            <div className="text-left space-y-4">
              <div>
                <p>
                  <span className="text-primary font-semibold text-lg">
                    📍 Address
                  </span>
                </p>
                <p>123 xyz city mall, Ahmedabad, Gujarat, 380025</p>
              </div>
              <div>
                <p>
                  <span className="text-primary font-semibold text-lg">
                    📞 Phone
                  </span>
                </p>
                <p>12345-67890 | 125-668-886</p>
              </div>
              <div>
                <p>
                  <span className="text-primary font-semibold text-lg">
                    🎧 Support
                  </span>
                </p>
                <p>Support.trendtrove@gmail.com</p>
              </div>
            </div>
            <form className="my-10" onSubmit={handleSubmit(formSubmitHandler)}>
              <div className="space-y-5">
                <div>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Full name"
                    register={register}
                    isDisabled={isLoading}
                  />
                </div>
                <div>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email address"
                    register={register}
                    isDisabled={isLoading}
                  />
                </div>
                <div>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="subject"
                    register={register}
                    isDisabled={isLoading}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    {...register("message")}
                    className="h-20 w-full bg-gray-100 px-4 py-2.5 rounded  border-none text-secondary focus:outline-none text-sm font-medium"
                  ></textarea>
                </div>
                <div>
                  <Button
                    title="Submit"
                    buttonStyles="w-fit bg-primary text-white"
                    type="submit"
                    isDisabled={isLoading}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-span-1">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470029.4907297672!2d72.25008569347868!3d23.01990207203543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1727931996248!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
