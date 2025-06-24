import PageLayout from "../layouts/PageLayout";
import ContactForm from "./../components/ContactForm";

const ContactUs = () => {
  return (
    <PageLayout>
      <div className="container h-screen mb-10 w-full flex flex-col justify-between items-center sm:flex-row">
        <div className="text-side w-full sm:w-1/2">
          <h1 className="text-orangy text-6xl font-extrabold mb-8">
            Contact Us
          </h1>
          <p className="font-semibold">
            Our support reply may get delayed on{" "}
            <span className="text-blue-500">Friday (Weekly Holiday)</span>.
            <br />
            <br /> Also, consider the time zone{" "}
            <span className="text-blue-500">(GMT +6)</span> difference when
            communicating with our customer service representatives.
            <br />
            <br /> We appreciate your understanding and apologize for any
            inconvenience.
          </p>
        </div>
        <div className="form-side w-full sm:w-96">
          <ContactForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactUs;
