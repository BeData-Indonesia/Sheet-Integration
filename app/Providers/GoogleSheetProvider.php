<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Google\Client;
use Google\Service\Sheets;
use Google\Service\Sheets\ValueRange;

class GoogleSheetProvider extends ServiceProvider
{
    public $client, $service, $documentId, $range;
    public function __construct()
    {
        $this->client = $this->getClient();
        $this->service = new Sheets($this->client);
        $this->documentId = env('SHEET_ID');
      
        $this->range = "'TRIP'!A:Z" ;
    }
    public function getClient()
    {
        $client = new Client();
        $client->setApplicationName('Google Sheets API PHP Quickstart');
        $client->setScopes(Sheets::SPREADSHEETS);
        $client->setAuthConfig(config('services.gcp.service_account'));
        $client->setAccessType('offline');
        $client->setPrompt('select_account consent');
        return $client;
    }

    public function readSheet()
    {
        $doc = $this->service->spreadsheets_values->get($this->documentId, $this->range);
        return $doc;
    }

    public function appendSheet($values)
    {

        $body = new ValueRange([
            'values' => $values
        ]);
        $params = [
            'valueInputOption' => 'USER_ENTERED'        
        ];
        $result = $this->service->spreadsheets_values->append($this->documentId, $this->range, $body, $params);
        
        return $result;
    }

    public function getLastRow()
    {
        $row = $this->service->spreadsheets_values->get($this->documentId, $this->range);
        $rowcount= sizeof($row);
        return $rowcount;
    }


}