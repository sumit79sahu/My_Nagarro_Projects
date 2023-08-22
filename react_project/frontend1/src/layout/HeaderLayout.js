import headerimg from '../Assets/header.png';
import Mobileimg from '../Assets/mobile.jpg';
import Fashionimg from '../Assets/fashion.jpg';
import Electronicsimg from '../Assets/electronics.jpg';
import Beautyimg from '../Assets/beauty.jpg';
import Otherimg from '../Assets/other.jpg';
export default function HeaderLayout() {
    return (
        <>
            <header className='bg-[#0B2040] px-10 md:px-20'>
                <div className='flex flex-col md:flex-row items-center justify-between py-4'>
                    <div className='w-[100%]'>
                        <h1 className='text-3xl font-medium text-white md:4xl lg:text-5xl'>The All-in-One Ecommerce Solution</h1>
                        <p className='text-white'>Shoppers have spent more than $28 billion and placed over 185 million orders on QuickMart ecommerce website</p>
                    </div>
                    <img className="h-[300px] md:w-[80%] md:h-[400px] lg:w-[100%] lg:h-[445px] object-contain" src={headerimg} alt="" />
                </div>
            </header>
            {/* header-bar */}

            <div className="mx-10 md:mx-20  relative bottom-7 flex justify-center md:block ">
                <div className="hidden bg-white rounded-lg drop-shadow-md pt-2 pb-3 md:block ">
                    <ul className="flex justify-between gap-2 px-10 items-center flex-wrap">
                        <li className="font-medium  md:text-[1.4rem] flex items-center gap-1">
                            <img className="h-[35px]"  src={Fashionimg} alt="" />
                            <a href="">Fashion</a>
                        </li>
                        <li className="text-xl font-medium md:text-[1.4rem] flex items-center gap-1">
                            <img className="h-[35px]" src={Electronicsimg} alt="" />
                            <a href="">Electronics</a>
                        </li>
                        <li className="text-xl font-medium md:text-[1.4rem] flex items-center gap-1">
                            <img className="h-[35px]" src={Mobileimg} alt="" />
                            <a href="">Mobiles</a>
                        </li>
                        <li className="text-xl font-medium md:text-[1.4rem] flex items-center gap-1">
                            <img className="h-[35px]" src={Beautyimg} alt="" />
                            <a href="">Beauty</a>
                        </li>
                        <li className="text-xl font-medium md:text-[1.4rem] flex items-center gap-1">
                            <img className="h-[35px]" src={Otherimg} alt="" />
                            <a href="">other</a>
                        </li>
                    </ul>
                </div>
                <div className="bg-white w-[80%]  md:hidden rounded-lg flex justify-center flex-wrap gap-3  py-2 px-2 drop-shadow-md">
                    <select className="py-1 w-[50%] text-center border-2 border-yellow-400 rounded-md  text-[1.2rem] font-medium text-black  focus:outline-none ">
                        <option value="" key="">Fashion</option>
                        <option value="" key="">Mobiles</option>
                        <option value="" key="">Electronics</option>
                        <option value="" key="">Beauty</option>
                        <option value="" key="">Cameras</option>
                    </select>
                    <button className=" w-[40%] bg-blue-600 rounded-md text-[1.2rem] font-medium text-white px-3 pt-1 pb-[0.4rem] ">Search</button>
                </div>

            </div>
        </>
    )
}