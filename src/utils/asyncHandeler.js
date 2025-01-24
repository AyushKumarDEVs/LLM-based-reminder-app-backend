export const asyncHandeler=(asyncfx)=>{
    return async (req,res,next)=>{
        try {
        
            await asyncfx(req,res,next);
            
    } catch (error) {
        console.log("ERRor=",error);
        next();
    }
    }
}