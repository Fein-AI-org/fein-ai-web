"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

export default function JoinWaitlist() {
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log("Form Data:", data);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#d7f48d] hover:bg-[#637041] hover:text-white" size="lg">Join the Waitlist</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Enter Email address</DialogTitle>
                    <DialogDescription>
                        Enter your name and email address to join the waitlist. We will send you an email when we are ready to launch.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" {...register("name")} placeholder="Your Name" className="col-span-3" />
                            {errors.name && <span className="col-span-4 text-red-500">{errors.name.message}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input id="email" {...register("email")} placeholder="fein.ai@fein.ai.com" className="col-span-3" />
                            {errors.email && <span className="col-span-4 text-red-500">{errors.email.message}</span>}
                        </div>
                    </div>
                    <DialogFooter className="w-full flex items-center justify-start">
                        <Button className="bg-[#d7f48d]" type="submit">
                            Join Waitlist
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
