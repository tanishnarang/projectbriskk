import { Link } from "react-router-dom";
export default function PaymentPage() {
  return (
    <div>
      <div className="box flex flex-col text-center mx-auto p-10 border rounded">
        <h1 className="font-semibold">We'll be coming soon to this Page.</h1>
        <p>
          Return to{" "}
          <Link to="/cart" className="hover:underline text-purple-600">
            Home Page
          </Link>
        </p>
      </div>
    </div>
  );
}
