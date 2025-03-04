"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Plus, Wallet } from "lucide-react";
import { useId } from "react";


function AdminPage() {
    const id = useId();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="aspect-square max-sm:p-0">
                    <Plus className="opacity-60 sm:-ms-1 sm:me-2" size={16} strokeWidth={2} aria-hidden="true" />
                    <span className="max-sm:sr-only">Add new</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className="flex flex-col gap-2">
                    <div
                        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
                        aria-hidden="true"
                    >

                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-left">New Problem</DialogTitle>
                        <DialogDescription className="text-left">
                            Add New problem
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor={`name-${id}`}>Problem name</Label>
                            <Input id={`name-${id}`} type="text" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`name-${id}`}>Description</Label>
                            <Input id={`name-${id}`} type="text" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`name-${id}`}>Inputs</Label>
                            <Input id={`name-${id}`} type="text" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`name-${id}`}>Outputs</Label>
                            <Input id={`name-${id}`} type="text" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`name-${id}`}>Test cases</Label>
                            <Input id={`name-${id}`} type="text" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`name-${id}`}>Problem name</Label>
                            <Input id={`name-${id}`} type="text" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`name-${id}`}>Problem name</Label>
                            <Input id={`name-${id}`} type="text" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`number-${id}`}>Card Number</Label>
                            <div className="relative">
                                <Input

                                    id={`number-${id}`}
                                    className="peer pe-9 [direction:inherit]"
                                />
                                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                    helo
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`expiry-${id}`}>Expiry date</Label>
                                <Input
                                    className="[direction:inherit]"

                                    id={`expiry-${id}`}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`cvc-${id}`}>CVC</Label>
                                <Input className="[direction:inherit]" id={`cvc-${id}`} />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id={`primary-${id}`} />
                        <Label htmlFor={`primary-${id}`} className="font-normal text-muted-foreground">
                            Set as default payment method
                        </Label>
                    </div>
                    <Button type="button" className="w-full">
                        Update card
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export { AdminPage };
