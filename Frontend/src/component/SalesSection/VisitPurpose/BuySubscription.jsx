import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import {
  buySubscription,
  getAllSubscription,
} from "../../../store/slices/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";

const BuySubscription = ({ _id, visitPurposeDetails }) => {
  const { subscriptions } = useSelector((state) => state.subscription);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      planId: "",
    },
  });

  const planId = watch("planId");


  const onSubmit = (data) => {
    data.petId = _id;
    data.visitType = visitPurposeDetails._id
    dispatch(buySubscription(data))
      .then((data) => {
        setIsLoading(true);
        if (data?.payload?.success) {
          alert("Visit saved successfully");
          navigate("/dashboard")
        } else alert(data?.payload?.message);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Error saving data");
        setIsLoading(false);
      });
  };

  const totalPrice = (id) => {
    if (id) {
      const plan = subscriptions.find((item) => item._id === id);
      return plan?.price;
    }
    return 0;
  };

  useEffect(() => {
    dispatch(getAllSubscription());
  }, [dispatch]);

  useEffect(() => {
    if (subscriptions && subscriptions.length > 0) {
      setValue("planId", subscriptions[0]?._id);
    }
  }, [subscriptions, setValue]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-700">Select Plan</h2>

        <div>
          <select
            {...register("planId", {
              required: "Please select a plan",
            })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="" disabled >
              Select Plan
            </option>
            {subscriptions?.map((item, idx) => {
              return item?.duration ? (
                <option
                  key={idx}
                  value={item?._id}
                >{`${item.subscriptionType?.purpose} - ${item.duration} days`}</option>
              ) : (
                <option
                  key={idx}
                  value={item?._id}
                >{`${item.subscriptionType?.purpose} - ${item.numberOfGroomings} groomings`}</option>
              );
            })}
          </select>
          {errors.planId && (
            <p className="text-red-500 text-sm mt-1">{errors.planId.message}</p>
          )}
        </div>

        {/* Price Details */}
        <div className="flex mt-3 items-center space-x-4">
          <label className="text-gray-600">Total Price:</label>
          <div className="text-lg font-semibold">{totalPrice(planId)}</div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

BuySubscription.propTypes = {
  _id: PropTypes.string.isRequired,
  visitPurposeDetails: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default BuySubscription;

