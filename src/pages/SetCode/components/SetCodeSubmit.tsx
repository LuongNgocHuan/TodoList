const SetCodeSubmit = ({isSubmitting}:any) => {
  return (
    <>
      <div className="flex justify-center">
        <button
          className="h-10 w-80 bg-green-600 rounded-2xl shadow-lg shadow-slate-400 text-white "
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Enter your code!"}
        </button>
      </div>
    </>
  );
};

export default SetCodeSubmit;
