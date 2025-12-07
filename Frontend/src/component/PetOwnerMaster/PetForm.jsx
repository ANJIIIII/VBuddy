import { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { addPet } from "../../store/slices/petSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, MapPin, Plus, Save, Trash2, Syringe, Dog, Calendar, AlertCircle, ArrowLeft } from "lucide-react";

// Reusing the speciesBreeds data structure
const speciesBreeds = {
  dog: [
    "Labrador Retriever", "German Shepherd", "Golden Retriever", "Shih Tzu", "Siberian Husky",
    "Poodle (Toy, Miniature, Standard)", "Maltipoo", "Pug", "Beagle", "Rottweiler",
    "Doberman Pinscher", "Boxer", "Great Dane", "Saint Bernard", "Cocker Spaniel",
    "Lhasa Apso", "Dachshund", "Chihuahua (Teacup & Standard)", "Pitbull Terrier",
    "Akita Inu", "Dalmatian", "French Bulldog", "English Bulldog", "Border Collie",
    "Bullmastiff", "Alaskan Malamute", "Cane Corso", "Belgian Malinois",
    "Pomeranian (including Toy Pomeranian)", "Yorkshire Terrier", "American Eskimo Dog",
    "Boston Terrier", "Afghan Hound", "Cavalier King Charles Spaniel", "Maltese", "Samoyed",
    "Newfoundland", "West Highland White Terrier (Westie)", "Miniature Schnauzer",
    "Bernese Mountain Dog", "Irish Setter", "Basset Hound", "Scottish Terrier", "Havanese",
    "Weimaraner", "Jack Russell Terrier", "Bloodhound", "Whippet", "Shetland Sheepdog",
    "Shiba Inu", "Indian Spitz", "Rajapalayan", "Gaddi Kutta", "Indie",
  ],
  cat: ["Persian", "Maine Coon", "Siamese", "Ragdoll", "Sphynx", "British Shorthair"],
  bird: ["Parrot", "Canary", "Cockatiel", "Finch", "Budgerigar"],
  fish: ["Betta Fish", "Goldfish", "Guppy", "Angelfish", "Cichlid"],
  rabbit: ["Himalayan", "Holland Lop", "Mini Rex", "Netherland Dwarf"],
  reptile: ["Bearded Dragon", "Leopard Gecko", "Corn Snake", "Chameleon", "Turtle"],
  hamster: ["Syrian Hamster", "Dwarf Hamster", "Roborovski Hamster"],
};

const PetForm = () => {
  const { addPetLoading } = useSelector((state) => state.pets);
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      pets: [{ vaccinations: [] }]
    }
  });

  // Using useFieldArray for better array management with react-hook-form
  const { fields: petFields, append: appendPet, remove: removePet } = useFieldArray({
    control,
    name: "pets"
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch(addPet(data))
      .then((res) => {
        if (res?.payload?.success) {
          alert("Data saved successfully");
          reset();
          navigate(-1); // Go back after success
        } else {
          alert("Error saving data");
        }
      })
      .catch((err) => {
        alert("Error saving data");
      });
  };

  return (
    <div className="min-h-screen bg-secondary-50/30 p-4 md:p-8 animate-in fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white border border-secondary-200 text-secondary-600 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm"
            aria-label="Go Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Add New Patient</h1>
            <p className="text-secondary-500 text-sm">Register a new pet and their owner</p>
          </div>
        </div>

        {addPetLoading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-secondary-200">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
              <p className="text-secondary-500 text-sm">Saving data...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Owner Information Section */}
            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-secondary-100 bg-secondary-50/50 flex items-center gap-2">
                <User className="text-primary-500" size={20} />
                <h2 className="font-semibold text-secondary-900">Owner Information</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Owner Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
                    <input
                      {...register("ownerName", { required: "Owner Name is required" })}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-secondary-300"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  {errors.ownerName && <span className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.ownerName.message}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
                    <input
                      type="tel"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number" }
                      })}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-secondary-300"
                      placeholder="e.g. 9876543210"
                    />
                  </div>
                  {errors.phone && <span className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.phone.message}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-secondary-300"
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Client Segment *</label>
                  <div className="relative">
                    <select
                      {...register("segment", { required: true })}
                      className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none"
                    >
                      <option value="Day Care">Day Care</option>
                      <option value="Veterinary">Veterinary</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-secondary-400 w-4 h-4" />
                    <textarea
                      {...register("address", { required: "Address is required" })}
                      rows={2}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-secondary-300"
                      placeholder="Full address"
                    />
                  </div>
                  {errors.address && <span className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.address.message}</span>}
                </div>
              </div>
            </div>

            {/* Pets Information Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-secondary-900 flex items-center gap-2">
                  <Dog className="text-primary-500" size={20} />
                  Pet Details
                </h2>
                <button
                  type="button"
                  onClick={() => appendPet({ vaccinations: [] })}
                  className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-primary-100"
                >
                  <Plus size={16} /> Add Another Pet
                </button>
              </div>

              {petFields.map((field, index) => (
                <PetInfoField
                  key={field.id}
                  index={index}
                  register={register}
                  control={control}
                  remove={removePet}
                  errors={errors}
                  showRemove={petFields.length > 1}
                />
              ))}

            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 font-medium"
              >
                <Save size={18} />
                Save Patient Record
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

// Sub-component for individual pet fields to manage complexity
const PetInfoField = ({ index, register, control, remove, errors, showRemove }) => {

  // We import useWatch inside the component or pass it down. 
  // Since we are inside the same file and imports are top level, we can just use useWatch.

  const species = useWatch({
    control,
    name: `pets.${index}.species`
  });

  const { fields: vaccineFields, append: appendVaccine, remove: removeVaccine } = useFieldArray({
    control,
    name: `pets.${index}.vaccinations`
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="px-6 py-4 border-b border-secondary-100 bg-secondary-50/50 flex justify-between items-center">
        <span className="font-semibold text-secondary-700 text-sm">Pet #{index + 1}</span>
        {showRemove && (
          <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors" title="Remove Pet">
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Pet Name *</label>
            <input
              {...register(`pets.${index}.name`, { required: "Pet Name is required" })}
              className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-secondary-300"
              placeholder="e.g. Bella"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Species *</label>
            <div className="relative">
              <select
                {...register(`pets.${index}.species`, { required: "Species is required" })}
                className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none"
              >
                <option value="">Select Species</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="fish">Fish</option>
                <option value="rabbit">Rabbit</option>
                <option value="reptile">Reptile</option>
                <option value="hamster">Hamster</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Breed *</label>
            <div className="relative">
              <select
                {...register(`pets.${index}.breed`, { required: "Breed is required" })}
                className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none"
                disabled={!species && species !== 'other'}
              >
                <option value="">Select Breed</option>
                {species && speciesBreeds[species] ? (
                  speciesBreeds[species].map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))
                ) : (
                  <option value="Other">Other</option>
                )}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Sex *</label>
            <div className="relative">
              <select
                {...register(`pets.${index}.sex`, { required: "Sex is required" })}
                className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none"
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Color *</label>
            <input
              {...register(`pets.${index}.color`, { required: "Color is required" })}
              className="w-full px-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-secondary-300"
              placeholder="e.g. Brown"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Date of Birth *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
              <input
                type="date"
                {...register(`pets.${index}.dob`, { required: "DOB is required" })}
                className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-secondary-500 uppercase tracking-wide">Registration Date *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 text-secondary-400 w-4 h-4" />
              <input
                type="date"
                // Defaulting to today if not provided handled by user
                {...register(`pets.${index}.registrationDate`, { required: "Registration Date is required" })}
                className="w-full pl-9 pr-4 py-2 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center h-full pt-6">
            <label className="flex items-center cursor-pointer gap-2">
              <input
                type="checkbox"
                {...register(`pets.${index}.neutered`)}
                className="w-5 h-5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-secondary-700">Neutered</span>
            </label>
          </div>
        </div>

        {/* Vaccinations Sub-section */}
        <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-secondary-700 flex items-center gap-2">
              <Syringe size={16} className="text-primary-500" /> Vaccinations
            </h4>
            <button
              type="button"
              onClick={() => appendVaccine({ name: "", numberOfDose: "" })}
              className="text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1"
            >
              <Plus size={14} /> Add Dose
            </button>
          </div>

          {vaccineFields.length > 0 ? (
            <div className="space-y-3">
              {vaccineFields.map((vField, vIndex) => (
                <div key={vField.id} className="flex gap-3 items-start">
                  <input
                    {...register(`pets.${index}.vaccinations.${vIndex}.name`)}
                    placeholder="Vaccine Name"
                    className="flex-1 px-3 py-1.5 bg-white border border-secondary-200 rounded text-sm focus:ring-1 focus:ring-primary-500 outline-none"
                  />
                  <input
                    type="number"
                    {...register(`pets.${index}.vaccinations.${vIndex}.numberOfDose`)}
                    placeholder="Doses"
                    className="w-20 px-3 py-1.5 bg-white border border-secondary-200 rounded text-sm focus:ring-1 focus:ring-primary-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeVaccine(vIndex)}
                    className="p-2 text-secondary-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-secondary-400 italic">No vaccinations added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetForm;
