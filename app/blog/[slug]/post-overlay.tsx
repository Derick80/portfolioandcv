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
            <div className="mx-auto max-w-4xl px-4 py-2">
                <h1 className="text-2xl font-bold">Post Overlay</h1>
                <p className="text-sm text-muted-foreground">Current Post: {slug}</p>
            </div>
        </div>
    )
}


export default PostOverlay  