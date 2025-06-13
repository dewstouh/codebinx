import { comparePassword } from "@/lib/password";
import { parseOrBadRequest } from "@/lib/zod";
import { getBin } from "@/services/bin.service";
import { GetBinParamsSchema } from "@/zod/getBinParams";

export async function GET(_req: Request, { params }: { params: { binId: string } }) {

    const { binId } = params;

    const parsed = parseOrBadRequest(GetBinParamsSchema, params);
    if (!parsed.success) return parsed.response;

    try {
        const bin = await getBin(binId);

        if (!bin) return new APIResponse()
            .status(404)
            .message("Bin not found")
            .error("not_found")

        if (bin.password) return new APIResponse()
            .status(403)
            .message("Unauthorized | Password required")
            .error("password_required")

            return new APIResponse().json(bin)
    } catch (err) {
        console.error(err)
        return new APIResponse()
            .status(500)
            .message("Internal Server Error")
            .error("server_error")
    }
}

export async function POST(req: Request) {
    const body = await req.json();

    const parsed = parseOrBadRequest(GetBinParamsSchema, body);
    if (!parsed.success) return parsed.response;

    const { binId, password } = parsed.data

    try {
        const bin = await getBin(binId);

        if (!bin) return new APIResponse()
            .status(404)
            .message("Bin not found")
            .error("not_found")

        if (bin.password) {
            const valid = password && (await comparePassword(password, bin.password))
            if (!valid) {
                return new APIResponse()
                    .status(401)
                    .message("Unauthorized | Password incorrect")
                    .error("invalid_password")
            }
        }

        return new APIResponse().json(bin)
    } catch (err) {
        console.error(err)
        return new APIResponse()
            .status(500)
            .message("Internal Server Error")
            .error("server_error")
    }
}