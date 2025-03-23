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
import { toast } from "sonner";
import confetti from "canvas-confetti";
import axios from "axios"; 

const schema = z.object({
    username: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

export default function JoinWaitlist() {
    const [open, setOpen] = useState(false);
    const [thankYouOpen, setThankYouOpen] = useState(false); // New state for thank you dialog
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for button disabled

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const showConfetti = () => {
        const end = Date.now() + 3 * 1000; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        const frame = () => {
            if (Date.now() > end) return;

            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors,
            });

            requestAnimationFrame(frame);
        };

        frame();
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            await axios.post('https://prelaunch-backend.onrender.com/api/v1/notify/', data);
            console.log("Form Data:", data);
            setOpen(false);
            setThankYouOpen(true);
            showConfetti();
            toast.success("Form Submitted Successfully", {
                style: {
                    backgroundColor: "#d7f48d",
                    color: "#000",
                },
            });
        } catch (error) {
            console.error("Failed to submit form", error);
            toast.error("Failed to submit form", {
                style: {
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
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
                                <Input id="username" {...register("username")} placeholder="Your Name" className="col-span-3" />
                                {errors.username && <span className="col-span-4 text-red-500">{errors.username.message}</span>}
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
                            <Button className="bg-[#d7f48d]" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={thankYouOpen} onOpenChange={setThankYouOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-3xl text-center py-5">🎉 Thank You! 🎉</DialogTitle>
                        <DialogDescription className="text-center">
                            Thank you for joining the waitlist. We will notify you when we are ready to launch.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="w-full flex items-center justify-start">
                        <Button className="bg-[#d7f48d]" onClick={() => setThankYouOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
