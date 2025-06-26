import Lottie from 'lottie-react';
import spinner from '../../assets/spinner.json'

const Spinner = () => {
  return (
    <div className="flex justify-center pt-6">
      <Lottie
        animationData={spinner}
        className="w-full h-[150px] md:h-[250px]"
      ></Lottie>
    </div>
  );
};

export default Spinner;
