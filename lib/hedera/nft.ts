/**
 * Hedera NFT Service Integration
 * Functions for minting NFT Support Badges
 * 
 * Note: Install @hashgraph/sdk for production use:
 * npm install @hashgraph/sdk
 */

// Hedera SDK imports (optional - will use mocks if not installed)
let HederaSDK: any = null;
try {
  HederaSDK = require("@hashgraph/sdk");
} catch (e) {
  console.warn("@hashgraph/sdk not installed. Using mock functions.");
}

// Types
export interface SupportNFTMetadata {
  campaignId: string;
  contributorWallet: string;
  contributionAmount: string;
  timestamp: number;
  campaignName?: string;
}

export interface NFTCollectionResult {
  collectionId: string;
  transactionId: string;
  logs: string[];
}

export interface NFTMintResult {
  collectionId: string;
  serialNumber: number;
  transactionId: string;
  metadataURI: string;
  logs: string[];
}

/**
 * Initialize Hedera Client
 */
function getHederaClient(): any {
  if (!HederaSDK) {
    throw new Error("@hashgraph/sdk is not installed. Install it with: npm install @hashgraph/sdk");
  }

  const operatorId = process.env.HEDERA_ACCOUNT_ID || "";
  const operatorKey = process.env.HEDERA_PRIVATE_KEY || "";

  if (!operatorId || !operatorKey) {
    throw new Error("HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY must be set in .env");
  }

  const client = HederaSDK.Client.forTestnet(); // Use forMainnet() for production
  client.setOperator(operatorId, HederaSDK.PrivateKey.fromString(operatorKey));
  
  return client;
}

/**
 * Create an NFT collection for a campaign's Support Badges
 * @param campaignId - The campaign ID
 * @returns Collection ID and transaction logs
 */
export async function createSupportNFTCollection(
  campaignId: string
): Promise<NFTCollectionResult> {
  // If SDK is not installed, use mock
  if (!HederaSDK) {
    return createSupportNFTCollectionMock(campaignId);
  }

  const logs: string[] = [];

  try {
    logs.push(`Creating NFT collection for campaign: ${campaignId}`);

    const client = getHederaClient();
    const collectionName = `Support Badges - Campaign ${campaignId}`;
    const collectionSymbol = `SB${campaignId.substring(0, 8)}`;

    // Create NFT collection (TokenType.NonFungibleUnique)
    const nftCreateTx = await new HederaSDK.TokenCreateTransaction()
      .setTokenName(collectionName)
      .setTokenSymbol(collectionSymbol)
      .setTokenType(HederaSDK.TokenType.NonFungibleUnique)
      .setTreasuryAccountId(process.env.HEDERA_ACCOUNT_ID || "")
      .setSupplyType(HederaSDK.TokenSupplyType.Infinite)
      .freezeWith(client);

    logs.push(`NFT collection creation transaction frozen: ${collectionName}`);

    const nftCreateSign = await nftCreateTx.sign(
      HederaSDK.PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY || "")
    );

    const nftCreateSubmit = await nftCreateSign.execute(client);
    const nftCreateRx = await nftCreateSubmit.getReceipt(client);
    const collectionId = nftCreateRx.tokenId?.toString() || "";

    logs.push(`NFT collection created successfully! Collection ID: ${collectionId}`);
    logs.push(`Transaction ID: ${nftCreateSubmit.transactionId.toString()}`);

    return {
      collectionId,
      transactionId: nftCreateSubmit.transactionId.toString(),
      logs,
    };
  } catch (error: any) {
    logs.push(`Error creating NFT collection: ${error.message}`);
    throw new Error(`Failed to create NFT collection: ${error.message}`);
  }
}

/**
 * Mint a Support Badge NFT for a contributor
 * @param campaignId - The campaign ID
 * @param contributorWallet - The wallet address of the contributor
 * @param metadataURI - URI pointing to the NFT metadata (IPFS, Arweave, etc.)
 * @returns NFT serial number and transaction logs
 */
export async function mintSupportNFT(
  campaignId: string,
  contributorWallet: string,
  metadataURI: string
): Promise<NFTMintResult> {
  // If SDK is not installed, use mock
  if (!HederaSDK) {
    return mintSupportNFTMock(campaignId, contributorWallet, metadataURI);
  }

  const logs: string[] = [];

  try {
    logs.push(`Minting Support Badge NFT for campaign: ${campaignId}`);
    logs.push(`Contributor: ${contributorWallet}`);
    logs.push(`Metadata URI: ${metadataURI}`);

    const client = getHederaClient();

    // First, get or create the collection for this campaign
    // In production, you'd store the collection ID mapping
    const collectionId = process.env[`NFT_COLLECTION_${campaignId}`] || "";

    if (!collectionId) {
      throw new Error(`NFT collection not found for campaign ${campaignId}`);
    }

    // Mint the NFT with metadata
    const nftMintTx = await new HederaSDK.TokenMintTransaction()
      .setTokenId(collectionId)
      .addMetadata(Buffer.from(metadataURI))
      .freezeWith(client);

    logs.push(`NFT mint transaction frozen`);

    const nftMintSign = await nftMintTx.sign(
      HederaSDK.PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY || "")
    );

    const nftMintSubmit = await nftMintSign.execute(client);
    const nftMintRx = await nftMintSubmit.getReceipt(client);
    const serialNumber = nftMintRx.serials[0]?.toNumber() || 0;

    logs.push(`Support Badge NFT minted successfully!`);
    logs.push(`Serial Number: ${serialNumber}`);
    logs.push(`Transaction ID: ${nftMintSubmit.transactionId.toString()}`);

    return {
      collectionId,
      serialNumber,
      transactionId: nftMintSubmit.transactionId.toString(),
      metadataURI,
      logs,
    };
  } catch (error: any) {
    logs.push(`Error minting NFT: ${error.message}`);
    throw new Error(`Failed to mint Support Badge NFT: ${error.message}`);
  }
}

/**
 * Generate metadata URI for Support Badge NFT
 * In production, this would upload to IPFS or Arweave
 * @param metadata - NFT metadata
 * @returns Metadata URI
 */
export function generateMetadataURI(metadata: SupportNFTMetadata): string {
  // In production, upload to IPFS/Arweave and return the hash
  // For now, return a data URI with JSON
  const metadataJSON = {
    name: `Support Badge - ${metadata.campaignName || metadata.campaignId}`,
    description: `Proof of support for campaign ${metadata.campaignId}`,
    image: "https://via.placeholder.com/512", // Replace with actual image URL
    attributes: [
      {
        trait_type: "Campaign ID",
        value: metadata.campaignId,
      },
      {
        trait_type: "Contribution Amount",
        value: metadata.contributionAmount,
      },
      {
        trait_type: "Timestamp",
        value: metadata.timestamp,
      },
      {
        trait_type: "Contributor",
        value: metadata.contributorWallet,
      },
    ],
  };

  const base64 = Buffer.from(JSON.stringify(metadataJSON)).toString("base64");
  return `data:application/json;base64,${base64}`;
}

/**
 * Mock function for testing without actual Hedera execution
 */
export async function createSupportNFTCollectionMock(
  campaignId: string
): Promise<NFTCollectionResult> {
  const logs: string[] = [];
  logs.push(`[MOCK] Creating NFT collection for campaign: ${campaignId}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockCollectionId = `0.0.${Math.floor(Math.random() * 1000000)}`;
  const mockTxId = `mock-nft-tx-${Date.now()}`;

  logs.push(`[MOCK] NFT collection created! Collection ID: ${mockCollectionId}`);
  logs.push(`[MOCK] Transaction ID: ${mockTxId}`);

  return {
    collectionId: mockCollectionId,
    transactionId: mockTxId,
    logs,
  };
}

/**
 * Mock function for minting Support Badge NFT
 */
export async function mintSupportNFTMock(
  campaignId: string,
  contributorWallet: string,
  metadataURI: string
): Promise<NFTMintResult> {
  const logs: string[] = [];
  logs.push(`[MOCK] Minting Support Badge NFT for campaign: ${campaignId}`);
  logs.push(`[MOCK] Contributor: ${contributorWallet}`);
  logs.push(`[MOCK] Metadata URI: ${metadataURI}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockCollectionId = `0.0.${Math.floor(Math.random() * 1000000)}`;
  const mockSerialNumber = Math.floor(Math.random() * 10000);
  const mockTxId = `mock-mint-tx-${Date.now()}`;

  logs.push(`[MOCK] Support Badge NFT minted!`);
  logs.push(`[MOCK] Collection ID: ${mockCollectionId}`);
  logs.push(`[MOCK] Serial Number: ${mockSerialNumber}`);
  logs.push(`[MOCK] Transaction ID: ${mockTxId}`);

  return {
    collectionId: mockCollectionId,
    serialNumber: mockSerialNumber,
    transactionId: mockTxId,
    metadataURI,
    logs,
  };
}

