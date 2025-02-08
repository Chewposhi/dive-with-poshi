const Badge3D = ({ cert }) => {
  return (
    <div className="xs:w-[300px] w-[200px] bg-[#151030] rounded-[20px] py-5 px-12 min-h-[320px] flex flex-col justify-start items-center border-2 border-gradient-to-r from-teal-400 via-blue-500 to-pink-500">
      <div className="w-32 h-32 bg-gradient-to-r from-teal-400 via-blue-500 to-pink-500 rounded-full flex justify-center items-center mb-4">
        <img
          src={cert.icon}
          alt={cert.title}
          className="w-24 h-24 object-contain"
        />
      </div>
      <h3 className="text-white text-[20px] font-bold text-center mt-4">
        {cert.title}
      </h3>
    </div>
  );
};

export default Badge3D;
