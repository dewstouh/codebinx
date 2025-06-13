import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PasswordModal() {
    return (
        <Dialog defaultOpen={true}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Bin protected under a password.</DialogTitle>
                        <DialogDescription>
                            This bin is password protected. Please enter the password to view it.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="password-1">Password</Label>
                            <Input id="password" name="password" placeholder="Enter password" type="password" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Access Bin</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
