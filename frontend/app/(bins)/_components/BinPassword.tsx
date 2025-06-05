import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BinPassword({
    onSubmit,
    password,
    onPasswordChange,
    loading,
    error,
}: {
    onSubmit: (e: React.FormEvent) => void
    password: string
    onPasswordChange: (val: string) => void
    loading: boolean
    error: string | null
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
                <CardHeader className="text-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
                    </div>
                    <CardTitle className="text-2xl font-bold">Protected Bin</CardTitle>
                    {error && (<CardDescription className="text-blue-100">{error}</CardDescription>)}
                </CardHeader>
                <CardContent className="p-8">
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter the bin password"
                                className="h-12 rounded-xl border-gray-200"
                                value={password}
                                onChange={(e) => onPasswordChange(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-xl font-medium"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Access Bin"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
