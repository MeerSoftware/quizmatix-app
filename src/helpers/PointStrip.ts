export default function PointStrip(number: any) {
    return (
        Number.
            parseFloat(number)
            .toPrecision(
                Number.parseInt(number).toString().length + 1
            )
    );
}
