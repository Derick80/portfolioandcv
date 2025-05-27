'use client'

import { cn } from "@/lib/utils";


type PostOverlayProps = {
    slug: string;
}

const PostOverlay = (
    {slug}: PostOverlayProps
)=>{
    console.log("PostOverlay rendered for slug:", slug);
    return(
        <div 
       className={cn(
        "absolute top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b transition-transform duration-300 transform")}>
sdfd
        </div>
    )
}


export default PostOverlay  