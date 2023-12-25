<?php

namespace App\Http\Controllers;

use App\Providers\GoogleSheetProvider;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class GoogleSheetController extends Controller
{
    private $googleSheetProvider;
    public function __construct()
    {
        // Initialize properties or perform tasks here
        $this->googleSheetProvider = new GoogleSheetProvider();
    }
   public function handleImage($image) {
        $filepath  = $image->store("uploads");
        $imageInput = '=IMAGE("'.env('PRODUCTION_URL',"http://localhost:8000")."/storage/".$filepath.'")';
        return $imageInput;
    }
    public function sheetOperation(Request $request)
    {
        
        try{

            $jamNyalaInput = $request->input('jamNyala');
            $jamPadamInput = $request->input('jamPadam');
            $rowCount =  $this->googleSheetProvider->getLastRow();
            $currentRow = $rowCount+1;
            $lamaPadam = '=IF(TRIP!$A'.$currentRow.'>TRIP!$B'.$currentRow.';24*60*(1-TRIP!$A'.$currentRow.'+TRIP!$B'.$currentRow.');24*60*(TRIP!$B'.$currentRow.'-TRIP!$A'.$currentRow.'))';
            $lamaPadamPMT = '=IF(C'.$currentRow.'>5;"IYA";"TIDAK")';
            
            $tanggalPadamInput = $request->input('tanggalPadam');
            $tanggalNyalaInput = $request->input('tanggalNyala');
            $carbonDate = Carbon::parse($tanggalPadamInput);
            $bulan  = $carbonDate->format('m');
            $tanggal = $carbonDate->format('d');
            
            $pmtInput = $request->input('pmt');
            $arusGGNR = $request->input('arusGGNR');
            $arusGGNS = $request->input('arusGGNS');
            $arusGGNT = $request->input('arusGGNT');
            $arusGGNN = $request->input('arusGGNN');
            
            $indikatorReleInput = $request->input('indikatorRele');
            $kelompokPenyebabInput = $request->input('kelompokPenyebab');
            $keteranganInput = $request->input('keterangan');
            $sesuaiJurnalAPDInput = $request->input('sesuaiJurnalAPD');
            
            $TWInput = $request->input('TW');
            $kelompokPenyebabSebenarnyaInput = $request->input('kelompokPenyebabSebenarnya');
           
            $arrayImage = [];
            $images = $request->file("images");
            if(is_countable($images)){
                foreach ($images as $image) {
                   $inputImage =  $this->handleImage($image);
                   array_push($arrayImage,$inputImage);
                }
            }
        $this->googleSheetProvider->appendSheet([[$jamPadamInput,$jamNyalaInput,$lamaPadam,$lamaPadamPMT,$bulan,$tanggal,$pmtInput,$tanggalPadamInput,$tanggalNyalaInput,$arusGGNR,$arusGGNS,$arusGGNT,$arusGGNN,$indikatorReleInput,$kelompokPenyebabInput,$keteranganInput,$sesuaiJurnalAPDInput,$TWInput,$kelompokPenyebabSebenarnyaInput,...$arrayImage]]);  
        return  redirect()->back()->with('message', 'success');
    }
        catch(Exception $e){

        return  back()->with('message', 'failed');
    }
    }


}
