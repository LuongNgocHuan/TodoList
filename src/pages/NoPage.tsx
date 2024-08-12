import notfound from "../assets/img/404.avif"
const NoPage = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <img className="w-full h-full" src={notfound} alt="notfoundIMG" />
      </div>
    </>
  );
};

export default NoPage;
