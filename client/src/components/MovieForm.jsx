import { useForm, useFieldArray } from "react-hook-form";
import {
  Save,
  Image as ImageIcon,
  Calendar,
  Star,
  Type,
  AlignLeft,
  Film,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect } from "react";

const MovieForm = ({ onSubmit, initialData, pageTitle, isLoading }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      description: "",
      genre: "",
      year: new Date().getFullYear(),
      poster: "",
      url: "",
      rating: 0,
      runTime: "",
      directorName: "",
      language: "",
      budget: "",
      production: "",
      cast: [],
      download: [],
      trailer: "",
    },
  });

  const {
    fields: castFields,
    append: appendCast,
    remove: removeCast,
  } = useFieldArray({
    control,
    name: "cast",
  });

  const {
    fields: downloadFields,
    append: appendDownload,
    remove: removeDownload,
  } = useFieldArray({
    control,
    name: "download",
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const posterUrl = watch("poster");

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900/60 backdrop-blur-xl border border-gray-700/60 rounded-2xl shadow-2xl text-white transition-all">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-700 pb-4">
        <Film className="text-red-500 w-8 h-8 drop-shadow" />
        <h2 className="text-3xl font-semibold tracking-tight">{pageTitle}</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        <div className="lg:col-span-2 space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Movie Title
            </label>
            <div className="relative">
              <Type className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:border-red-500 focus:ring focus:ring-red-500/20 transition outline-none"
                placeholder="e.g. The Dark Knight"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Synopsis
            </label>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows="4"
                className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:border-red-500 focus:ring focus:ring-red-500/20 resize-none transition"
                placeholder="Movie plot summary..."
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Runtime
              </label>
              <input
                {...register("runTime", { required: "Runtime is required" })}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg"
                placeholder="2h 15m"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Director Name
              </label>
              <input
                {...register("directorName", {
                  required: "Director name is required",
                })}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg"
                placeholder="Christopher Nolan"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Genre
              </label>
              <select
                {...register("genre", { required: "Genre is required" })}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:border-red-500 focus:ring focus:ring-red-500/20 transition"
              >
                <option value="">Select Genre</option>
                <option>Action</option>
                <option>Drama</option>
                <option>Comedy</option>
                <option>Horror</option>
                <option>Sci-Fi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Year
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input
                  type="number"
                  {...register("year", { min: 1900, max: 2100 })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:border-red-500 focus:ring focus:ring-red-500/20 transition"
                  placeholder="2024"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Rating (0-10)
              </label>
              <div className="relative">
                <Star className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input
                  type="number"
                  step="0.1"
                  {...register("rating", { min: 0, max: 10 })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg"
                  placeholder="8.4"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Language
              </label>
              <input
                {...register("language", { required: "Language is required" })}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg"
                placeholder="English"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Budget
              </label>
              <input
                {...register("budget")}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg"
                placeholder="$200M"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Production Company
              </label>
              <input
                {...register("production")}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg"
                placeholder="Warner Bros"
              />
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Cast</h3>
              <button
                type="button"
                onClick={() => appendCast({ name: "", role: "", picture: "" })}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm cursor-pointer"
              >
                <Plus size={16} /> Add Cast Member
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {castFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-3 gap-4 bg-gray-800/50 p-4 border border-gray-700 rounded-lg relative"
                >
                  <input
                    {...register(`cast.${index}.name`, { required: true })}
                    placeholder="Actor Name"
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    {...register(`cast.${index}.role`, { required: true })}
                    placeholder="Role"
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    {...register(`cast.${index}.picture`)}
                    placeholder="Picture URL"
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeCast(index)}
                    className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-700 p-2 rounded-full cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Download Links</h3>
              <button
                type="button"
                onClick={() =>
                  appendDownload({
                    "480p": "",
                    "720p": "",
                    "1080p": "",
                    "4k": "",
                  })
                }
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm cursor-pointer"
              >
                <Plus size={16} /> Add Download
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {downloadFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-4 gap-4 bg-gray-800/50 p-4 border border-gray-700 rounded-lg relative"
                >
                  <input
                    {...register(`download.${index}.480p`)}
                    placeholder="480p URL"
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    {...register(`download.${index}.720p`)}
                    placeholder="720p URL"
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    {...register(`download.${index}.1080p`)}
                    placeholder="1080p URL"
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    {...register(`download.${index}.4k`)}
                    placeholder="4K URL"
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeDownload(index)}
                    className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-700 p-2 rounded-full cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <label className="block text-sm font-medium text-gray-300">
            Poster Preview
          </label>
          <div className="w-full h-[420px] bg-gray-800/50 border border-gray-700 rounded-xl shadow-inner flex items-center justify-center overflow-hidden group">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt="Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/300x450?text=Invalid+URL")
                }
              />
            ) : (
              <div className="text-center text-gray-500">
                <ImageIcon className="w-14 h-14 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Image will appear here</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Poster Image URL
            </label>
            <input
              {...register("poster")}
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              URL
            </label>
            <input
              {...register("url")}
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Trailer URL
            </label>
            <input
              {...register("trailer")}
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg"
              placeholder="https://..."
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition active:scale-[0.97] cursor-pointer"
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                <Save size={20} /> Save Movie
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
