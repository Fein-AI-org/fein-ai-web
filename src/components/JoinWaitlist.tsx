"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function JoinWaitlist() {

    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#d7f48d] hover:bg-[#637041] hover:text-white" size="lg">Join the Waitlist</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Enter Email address</DialogTitle>
                    <DialogDescription>
                        Enter your email address to join the waitlist. We will send you an email when we are ready to launch.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Email
                        </Label>
                        <Input id="email" value={email} placeholder="fein.ai@fein.ai.com" onChange={handleChange} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter className="w-full flex items-center justify-start">
                    <Button type="submit" onClick={() => setOpen(false)}>
                        Join Waitlist
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
