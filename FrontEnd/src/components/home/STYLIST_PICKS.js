import STYLIST from '../../assets/images/img_1.png';
const STYLIST_PICKS=()=>
{
    return(
        <>
        <div className="relative">
        <img className="fluid" src={STYLIST} alt="" />
        <p className="absolute top-[200px] right-[100px] text-center text-[48px] text-white w-[500px] h-auto m-0 p-0 uppercase font-bold leading-[48px]">
          stylist picks beat the heat
        </p>
      </div>
        </>
    )
}
export default STYLIST_PICKS;