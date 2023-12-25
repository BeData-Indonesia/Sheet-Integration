import React, { useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, Head, usePage } from "@inertiajs/inertia-react";
import SelectInput from "@/Components/SelectInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Resizer from "react-image-file-resizer";
const keypoint = [
    { name: "PMT Monaco" },
    { name: "Rec. Kantor Lurah" },
    { name: "Rec. Sp Granit" },
    { name: "Rec. Keritang" },
    { name: "Rec. Kotabaru" },
    { name: "Rec. PKJ" },
    { name: "Rec. Sei Ara" },
    { name: "Rec. Suhada" },
    { name: "Rec. Enok Dalam" },
    { name: "Rec. Selat Nama" },
    { name: "Rec. Haji Ali" },
    { name: "LBS Benteng" },
    { name: "LBS PKJ" },
];
const kelompokPenyebabOptions = [
    { name: "E1. Pohon" },
    { name: "E2. Kondisi Alam" },
    { name: "E3. Pihak ke 3 / Binatang" },
    { name: "E4. Layang2 / Umbul2" },
    { name: "I1. Komponen JTM" },
    { name: "I2. Peralatan JTM" },
    { name: "I3. Gardu" },
    { name: "I4. Tiang" },
    { name: "Lain - Lain" },
];

const TWList = [
    { name: "TW I" },
    { name: "TW II" },
    { name: "TW III" },
    { name: "TW IV" },
];
const indikatorReleList = [{ name: "OCR" }, { name: "GFR" }];
const sesuaiJurnalAPD = [{ name: "IYA" }, { name: "TIDAK" }];
const options = [
    { name: "Januari", value: 1 },
    { name: "Februari", value: 2 },
    { name: "Maret", value: 3 },
    { name: "April", value: 4 },
    { name: "Mei", value: 5 },
    { name: "Juni", value: 6 },
    { name: "Juli", value: 7 },
    { name: "Agustus", value: 8 },
    { name: "September", value: 9 },
    { name: "Oktober", value: 10 },
    { name: "November", value: 11 },
    { name: "Desember", value: 12 },
];
const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            600,
            600,
            "JPEG",
            80,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        );
    });

const ImageReview = ({ images }) => {
    if (images) {
        return (
            <div className=" w-20 flex gap-5">
                {images.map((image, i) => {
                    const fotoUrl = URL.createObjectURL(image);
                    return <img key={i} src={fotoUrl} alt={image.name} />;
                })}
            </div>
        );
    } else return <div></div>;
};

const handleImage = async (files) => {
    try {
        const fileArray = [];
        for (var key in files) {
            if (!isNaN(key)) {
                const file = await resizeFile(files[key]);
                fileArray.push(file);
            }
        }
        setData("image", fileArray);
    } catch (error) {}
};

export default function Dashboard(props) {
    useEffect(() => {
        if (props.flash.message == "success") {
            toast.success("berhasil menambahkan data");
        } else if (props.flash.message == "failed") {
            toast.error("data gagal terupload");
        }
    }, [props]);

    const { data, setData, post, processing, errors } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("dashboard"));
    };
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" flex justify-center">
                            <div className=" px-4 md:px-6 lg:px-8 xl:px-12 w-full max-w-7xl py-12">
                                <form onSubmit={submit}>
                                    {/* jam padam */}
                                    <div>
                                        <InputLabel
                                            htmlFor="jamPadam"
                                            value="Jam Padam"
                                        />
                                        <TextInput
                                            required
                                            id="jamPadam"
                                            type="time"
                                            step="2"
                                            name="jamPadam"
                                            value={data.jamPadam}
                                            className="mt-1 block w-40"
                                            autoComplete="jamPadam"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "jamPadam",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.jamPadam}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* jam nyala */}
                                    <div>
                                        <InputLabel
                                            htmlFor="jamNyala"
                                            value="Jam Nyala"
                                        />
                                        <TextInput
                                            required
                                            id="jamNyala"
                                            type="time"
                                            step="2"
                                            name="jamNyala"
                                            value={data.jamNyala}
                                            className="mt-1 block w-40"
                                            autoComplete="jamNyala"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "jamNyala",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.jamNyala}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* tanggal padam */}

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="tanggalPadam"
                                            value="Tanggal Padam"
                                        />

                                        <TextInput
                                            required
                                            id="tanggalPadam"
                                            type="date"
                                            name="tanggalPadam"
                                            value={data.tanggalPadam}
                                            className="mt-1 block w-40"
                                            autoComplete="tanggalPadam"
                                            onChange={(e) =>
                                                setData(
                                                    "tanggalPadam",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.tanggalPadam}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* tanggal nyala */}

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="tanggalNyala"
                                            value="Tanggal Nyala"
                                        />

                                        <TextInput
                                            required
                                            id="tanggalNyala"
                                            type="date"
                                            name="tanggalNyala"
                                            value={data.tanggalNyala}
                                            className="mt-1 block w-40"
                                            autoComplete="tanggalNyala"
                                            onChange={(e) =>
                                                setData(
                                                    "tanggalNyala",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.tanggalNyala}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* pmt key point */}
                                    <div className=" mt-4">
                                        <InputLabel
                                            htmlFor="pmt"
                                            value="PMT/KEYPOINT"
                                        />
                                        <SelectInput
                                            required
                                            className="mt-1 block w-1/2"
                                            name="pmt"
                                            id="pmt"
                                            options={keypoint}
                                            value={data.pmt}
                                            onChange={(e) => {
                                                setData("pmt", e.target.value);
                                            }}
                                        />
                                    </div>

                                    {/* arus ggn r */}

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="arusGGNR"
                                            value="Arus GGN (R)"
                                        />

                                        <TextInput
                                            required
                                            id="arusGGNR"
                                            type="number"
                                            name="arusGGNR"
                                            value={data.arusGGNR}
                                            className="mt-1 block w-1/2"
                                            autoComplete="arusGGNR"
                                            onChange={(e) =>
                                                setData(
                                                    "arusGGNR",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.arusGGNR}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* arus ggn s */}

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="arusGGNS"
                                            value="Arus GGN (S)"
                                        />

                                        <TextInput
                                            required
                                            id="arusGGNS"
                                            type="number"
                                            name="arusGGNS"
                                            value={data.arusGGNS}
                                            className="mt-1 block w-1/2"
                                            autoComplete="arusGGNS"
                                            onChange={(e) =>
                                                setData(
                                                    "arusGGNS",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.arusGGNS}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* arus ggn t */}

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="arusGGNT"
                                            value="arus GGN (T)"
                                        />

                                        <TextInput
                                            required
                                            id="arusGGNT"
                                            type="number"
                                            name="arusGGNT"
                                            value={data.arusGGNT}
                                            className="mt-1 block w-1/2"
                                            autoComplete="arusGGNT"
                                            onChange={(e) =>
                                                setData(
                                                    "arusGGNT",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.arusGGNT}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* arus ggn n */}

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="arusGGNN"
                                            value="arus GGN (N)"
                                        />

                                        <TextInput
                                            required
                                            id="arusGGNN"
                                            type="number"
                                            name="arusGGNN"
                                            value={data.arusGGNN}
                                            className="mt-1 block w-1/2"
                                            autoComplete="arusGGNN"
                                            onChange={(e) =>
                                                setData(
                                                    "arusGGNN",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.arusGGNN}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* indikator rele */}
                                    <div className=" mt-4">
                                        <InputLabel
                                            htmlFor="indikatorRele"
                                            value="Indikator Rele"
                                        />
                                        <SelectInput
                                            required
                                            className="mt-1 block w-1/2"
                                            name="indikatorRele"
                                            id="indikatorRele"
                                            options={indikatorReleList}
                                            value={data.indikatorRele}
                                            onChange={(e) =>
                                                setData(
                                                    "indikatorRele",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    {/* kelompok penyebab */}
                                    <div className=" mt-4">
                                        <InputLabel
                                            htmlFor="kelompokPenyebab"
                                            value="Kelompok Penyebab"
                                        />
                                        <SelectInput
                                            required
                                            className="mt-1 block w-1/2"
                                            name="kelompokPenyebab"
                                            id="kelompokPenyebab"
                                            options={kelompokPenyebabOptions}
                                            value={data.kelompokPenyebab}
                                            onChange={(e) =>
                                                setData(
                                                    "kelompokPenyebab",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    {/* keterangan */}
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="keterangan"
                                            value="Keterangan"
                                        />

                                        <TextInput
                                            required
                                            id="keterangan"
                                            type="text"
                                            name="keterangan"
                                            value={data.keterangan}
                                            className="mt-1 block w-1/2"
                                            autoComplete="keterangan"
                                            onChange={(e) =>
                                                setData(
                                                    "keterangan",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.keterangan}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* sesuai jurnal apd */}
                                    <div className=" mt-4">
                                        <InputLabel
                                            htmlFor="sesuaiJurnalAPD"
                                            value="Sesuai Jurnal APD"
                                        />
                                        <SelectInput
                                            required
                                            className="mt-1 block w-1/2"
                                            name="sesuaiJurnalAPD"
                                            id="sesuaiJurnalAPD"
                                            options={sesuaiJurnalAPD}
                                            value={data.sesuaiJurnalAPD}
                                            onChange={(e) =>
                                                setData(
                                                    "sesuaiJurnalAPD",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    {/* TW */}
                                    <div className=" mt-4">
                                        <InputLabel htmlFor="TW" value="TW" />
                                        <SelectInput
                                            required
                                            className="mt-1 block w-1/2"
                                            name="TW"
                                            id="TW"
                                            options={TWList}
                                            value={data.TW}
                                            onChange={(e) =>
                                                setData("TW", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.TW}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* KELOMPOK PENYEBAB */}
                                    <div className=" mt-4">
                                        <InputLabel
                                            htmlFor="kelompokPenyebabSebenarnya"
                                            value="Kelompok Penyebab Sebenarnya"
                                        />
                                        <SelectInput
                                            required
                                            className="mt-1 block w-1/2"
                                            name="kelompokPenyebabSebenarnya"
                                            id="kelompokPenyebabSebenarnya"
                                            options={kelompokPenyebabOptions}
                                            value={
                                                data.kelompokPenyebabSebenarnya
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "kelompokPenyebabSebenarnya",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={
                                                errors.kelompokPenyebabSebenarnya
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* input image */}

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="fotoEviden"
                                            value="Foto Eviden"
                                        />

                                        <TextInput
                                            id="images"
                                            type="file"
                                            name="images"
                                            className="mt-1 block w-1/2"
                                            autoComplete="images"
                                            onChange={(e) => {
                                                handleImage(e.target.files);
                                            }}
                                            accept="image/png, image/jpeg"
                                            multiple
                                        />

                                        <InputError
                                            message={errors.fotoEviden}
                                            className="mt-2"
                                        />
                                        <div className=" flex py-5 gap-5"></div>
                                    </div>

                                    <ImageReview images={data.images} />
                                    <div className="flex items-center justify-end mt-4">
                                        <PrimaryButton
                                            className="ms-4"
                                            disabled={processing}
                                        >
                                            Submit
                                        </PrimaryButton>
                                        <ToastContainer />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
