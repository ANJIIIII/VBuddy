import { useEffect, useState } from "react";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionDetails } from "../../../store/slices/subscriptionSlice";
import { addGroomingVisit } from "../../../store/slices/visitSlice";
import PropTypes from "prop-types";

const Grooming = ({ _id, visitPurposeDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [planId, setPlanId] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isSubscriptionAvailed, setIsSubscriptionAvailed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { subscriptionDetails } = useSelector((state) => state.subscription);

  useEffect(() => {

    if (!_id || _id.trim() === '') {
      console.error("Pet ID is missing or empty");
      return;
    }

    if (!visitPurposeDetails || !visitPurposeDetails._id || visitPurposeDetails._id.trim() === '') {
      console.error("Visit purpose details are missing or invalid");
      return;
    }

    console.log("Fetching subscription details with pet ID:", _id);
    console.log("Visit purpose details:", visitPurposeDetails._id);

    const params = new URLSearchParams();
    params.append("petId", _id.trim());
    params.append("visitType", visitPurposeDetails._id.trim());

    const queryString = params.toString();
    dispatch(getSubscriptionDetails(queryString));
  }, [_id, visitPurposeDetails, dispatch]);

  const handleAvail = (id) => {
    setPlanId(id);
    setIsSubscriptionAvailed(!isSubscriptionAvailed);
  };

  const getTotalPrice = () => {
    if (isSubscriptionAvailed) return 0;
    return visitPurposeDetails.price - discount > 0 ? visitPurposeDetails.price - discount : 0;
  };

  const handleDiscountChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= visitPurposeDetails.price) {
      setDiscount(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting form with pet ID:", _id);
    console.log("Visit purpose details ID:", visitPurposeDetails._id);

    // Validate the IDs to ensure they exist
    if (!_id || _id.trim() === '') {
      console.error("Missing pet ID");
      alert("A pet must be selected. Please select a pet before proceeding.");
      return;
    }

    if (!visitPurposeDetails || !visitPurposeDetails._id || visitPurposeDetails._id.trim() === '') {
      console.error("Missing visit type ID");
      alert("Visit type is missing. Please try again.");
      return;
    }

    // Prepare form data in a format matching your schema
    const data = {
      pet: _id, // Use the pet ID passed as prop
      visitType: visitPurposeDetails._id, // Use the visit type ID
      details: {
        planId: planId,
        isSubscriptionAvailed,
        discount,
        fullPrice: visitPurposeDetails.price,
        finalPrice: getTotalPrice()
      }
    };

    console.log("Form data prepared:", data);

    // Process the visit save directly without payment
    processVisitSave(data);
  };

  const processVisitSave = (data) => {
    setIsLoading(true);

    console.log("Processing visit save with data:", data);
    console.log("Pet ID:", data.pet);
    console.log("Visit Type ID:", data.visitType);

    // Make absolutely sure we have valid IDs before proceeding
    if (!data.pet || typeof data.pet !== 'string' || data.pet.trim() === '') {
      console.error("Invalid pet ID:", data.pet);
      alert("Invalid pet ID. Please select a pet before proceeding.");
      setIsLoading(false);
      return;
    }

    if (!data.visitType || typeof data.visitType !== 'string' || data.visitType.trim() === '') {
      console.error("Invalid visit type ID:", data.visitType);
      alert("Invalid visit type. Please try again.");
      setIsLoading(false);
      return;
    }

    // Create the request body that matches backend expectations
    const requestBody = {
      petId: data.pet.trim(),
      visitType: data.visitType.trim(),
      discount: data.details.discount || 0,
      isSubscriptionAvailed: data.details.isSubscriptionAvailed || false,
      planId: data.details.planId || ""
    };

    console.log("Saving visit with data:", requestBody);

    // Use the Redux action to save the visit
    dispatch(addGroomingVisit(requestBody))
      .then((result) => {
        console.log("Save result:", result);
        if (result?.payload?.success) {
          alert("Visit saved successfully");
          navigate("/dashboard");
        } else {
          alert(result?.payload?.message || "Failed to save visit");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error saving visit:", error);
        alert("An error occurred: " + error.message);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="hidescroller">
      {subscriptionDetails ? (
        <div className="mt-3 max-w-full mx-auto p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Subscription Details
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span className="font-medium">Pet Name:</span>
              <span>{subscriptionDetails?.petId?.name}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span className="font-medium">Owner Name:</span>
              <span>{subscriptionDetails?.petId?.owner?.name}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span className="font-medium">Number of Groomings left:</span>
              <span>{subscriptionDetails?.numberOfGroomings}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={() => handleAvail(subscriptionDetails?.planId?._id)}
              className="w-1/2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              {isSubscriptionAvailed ? "Not Avail" : "Avail"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 max-w-full mx-auto p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            The pet has no active subscription for Grooming
          </h2>
        </div>
      )}
      <div className="max-w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full space-y-4"
        >

          {!isSubscriptionAvailed ? (
            <div className="flex w-full items-center justify-between px-5">
              <div>
                <label className="block text-gray-600 mb-1">Price</label>
                <div>{visitPurposeDetails?.price}</div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Discount</label>
                <input
                  type="number"
                  max={visitPurposeDetails?.price}
                  min={0}
                  value={discount}
                  onChange={handleDiscountChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter discount"
                />
              </div>
            </div>
          ) : null}
          <div className="flex mt-3 items-center space-x-4">
            <label className="text-gray-600">Total Price:</label>
            <div className="text-lg font-semibold">
              ₹{getTotalPrice()}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Visit
          </button>
        </form>
      </div>
    </div>
  );
};

Grooming.propTypes = {
  _id: PropTypes.string.isRequired,
  visitPurposeDetails: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Grooming;
