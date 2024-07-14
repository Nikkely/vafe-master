// import { Counter } from '../app/features/counter';
import { Translater } from '../app/features/translater/Translater';

const Content = () => {
  return (
    <div className="fixed z-[999] bottom-2 right-2 shadow-xl border-[1px] bg-white bg-opacity-10">
      <div className="flex justify-center mt-2 text-base">vafe master</div>
      {/* <Counter /> */}
      <Translater />
    </div>
  );
};

export default Content;
